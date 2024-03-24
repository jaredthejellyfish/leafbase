import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';

import type { Database } from '@l/database';

import function_descriptions, { runFunction } from './functions';

export const runtime = 'edge';

type Message = {
  role: 'user' | 'system';
  content: string;
};

type SystemMessage = {
  id: string;
  role: 'system';
  content: string;
};

type Data = {
  messages: Message[];
  system_message: SystemMessage;
};

const MessagesSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'system', 'assistant']),
      content: z.string(),
    }),
  ),
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { messages: reqMessages, system_message: systemMessage } =
    (await req.json()) as Data;

  const { messages } = MessagesSchema.parse({
    messages: [systemMessage, ...reqMessages],
  });

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: messages,
    functions: function_descriptions,
    function_call: 'auto',
    temperature: 0.2,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
  });

  const stream = OpenAIStream(response, {
    experimental_onFunctionCall: async (
      { name, arguments: args },
      createFunctionCallMessages,
    ) => {
      const { data: result, system_message: newSystemMessage } =
        await runFunction(name, args);

      const newMessages = createFunctionCallMessages(result);

      return openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        stream: true,
        messages: [newSystemMessage, ...(newMessages as Message[])],
        temperature: 0.2,
        max_tokens: 1200,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
    },
  });

  return new StreamingTextResponse(stream);
}
