import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';

import type { Database } from '@l/database';

export const runtime = 'edge';

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
  const { messages: reqMessages } = (await req.json()) as {
    messages: { role: 'user' | 'system' | 'assistant'; content: string }[];
  };

  const { messages } = MessagesSchema.parse({ messages: reqMessages });

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
    stream: true,
    messages: messages,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
