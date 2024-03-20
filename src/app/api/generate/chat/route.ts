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
      const result = await runFunction(name, args);

      const newMessages = createFunctionCallMessages(result);

      const newSystemMessage: Message = {
        role: 'system',
        content: `Begin your message by stating the reason for recommending the strains. Ensure that the reason remains unchanged.

        List each recommended strain at the conclusion of your message.
        
        All the strains should be grouped together under a single tag. The format of the tag should be as follows: [strain:{"strains":[{"slug":"strain-slug","image":"/path/to/strain-image.jpg","name":"Strain Name"}]}]
        
        Within this tag, each strain should be represented by three components: 
        - "slug": This serves as the unique identifier for the strain. It should be formatted as "strain-slug".
        - "image": This is the pathway to the image of the strain. It should be formatted as "/path/to/strain-image.jpg".
        - "name": This is the name of the strain. It should be formatted as "Strain Name".
        
        Here are a couple of examples for better understanding:
        
        Example 1:
        [strain:{"strains":[{"slug":"blue-dream","image":"/images/blue-dream.jpg","name":"Blue Dream"}]}]
        
        Example 2:
        [strain:{"strains":[{"slug":"sour-diesel","image":"/images/sour-diesel.jpg","name":"Sour Diesel"}]}]
        
        Remember, all strains should be grouped under the same tag. So, if you have two strains, the format should be as follows:
        
        [strain:{"strains":[{"slug":"blue-dream","image":"/images/blue-dream.jpg","name":"Blue Dream"},{"slug":"sour-diesel","image":"/images/sour-diesel.jpg","name":"Sour Diesel"}]}]`,
      };

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
