import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database';
import OpenAI from 'openai';

const openai = new OpenAI();

type RequestData = {
  strain1: string;
  strain2: string;
};

export const runtime = 'edge';

export async function POST(request: Request) {
  const { strain1, strain2 } = (await request.json()) as RequestData;

  if (!strain1 || !strain2) {
    return new Response('No strains in the request', { status: 400 });
  }

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase
    .from('strains')
    .select('*')
    .in('slug', [strain1, strain2]);

  if (error) {
    return new Response(
      'No strains in the database match the requested ones.',
      { status: 400 }
    );
  }

  // check for existing pairing
  const { data: existingPairing, error: existingPairingError } = await supabase
    .from('pairings')
    .select('*')
    .eq('strain1_id', data[0].id)
    .eq('strain2_id', data[1].id)
    .maybeSingle();

  if (existingPairingError) {
    console.error(existingPairingError);
  }
  if (existingPairing) {
    return new Response(existingPairing.body, { status: 200 });
  }

  if (error) {
    console.error(error);
    return new Response('No strains in the database response', { status: 400 });
  }

  const strain1Name = data[0].name;
  const strain2Name = data[1].name;
  const strain1id = data[0].id;
  const strain2id = data[1].id;

  const formattedStrain1 = `\`\`\`${strain1Name}\n${JSON.stringify(
    data[0]
  )}\`\`\``;
  const formattedStrain2 = `\`\`\`${strain2Name}\n${JSON.stringify(
    data[1]
  )}\`\`\``;

  const prompt = `${formattedStrain1}\n${formattedStrain2}\n\nDescribe why ${strain1Name} and ${strain2Name} are two strains that go well together.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    messages: [
      {
        role: 'system',
        content:
          'You specialise in talking about combinations between marijuana strains. Talk about the flavor and experience a person may feel. Keep your responses under 100 words and break it up so the user can read it more clearly.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.1,
    max_tokens: 250,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      let response = '';

      for await (const part of completion) {
        const text = part.choices[0]?.delta.content ?? '';
        const chunk = encoder.encode(text);
        response += text;
        controller.enqueue(chunk);
      }

      const { error: newPairingError } = await supabase
        .from('pairings')
        .insert([
          { strain1_id: strain1id, strain2_id: strain2id, body: response, },
        ]);

      if (newPairingError) {
        console.error(newPairingError);
        controller.close();
        return new Response('Error inserting new pairing', { status: 400 });
      }

      controller.close();
    },
  });

  return new Response(stream);
}