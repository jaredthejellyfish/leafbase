import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import OpenAI from 'openai';

import type { Database } from '@/lib/database';

const openai = new OpenAI();

type RequestData = {
  strain1: string;
  strain2: string;
};

export async function POST(request: Request) {
  try {
    const { strain1, strain2 } = (await request.json()) as RequestData;

    if (!strain1 || !strain2) {
      return NextResponse.json('No strains in the request', { status: 400 });
    }

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore,
    });

    // check for existing pairing
    const { data: existingPairing, error: existingPairingError } =
      await supabase
        .from('short_pairings')
        .select('*')
        .eq('strain1_id', strain1)
        .eq('strain2_id', strain2)
        .maybeSingle();

    if (existingPairingError) {
      console.error(existingPairingError);
    }

    if (existingPairing) {
      return new Response(existingPairing.body, { status: 200 });
    }

    const { data, error } = await supabase
      .from('strains')
      .select('*')
      .in('id', [strain1, strain2]);

    if (error || data.length < 2) {
      console.error(error || 'No strains in the database response');
      return NextResponse.json('No strains in the database response', {
        status: 400,
      });
    }

    const strain1Name = data[0].name;
    const strain2Name = data[1].name;

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
            'You specialise in talking about combinations between marijuana strains. Talk about the flavor and experience a person may feel. Keep your responses under 20 words.',
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
    });

    const { data: newPairing, error: newPairingError } = await supabase
      .from('short_pairings')
      .insert({
        body: completion.choices[0].message.content,
        strain1_id: strain1,
        strain2_id: strain2,
        strain2_slug: data[1].slug,
      })
      .select()
      .single();

    if (newPairingError) {
      console.error(newPairingError);
      return NextResponse.json('Error generating pairing', { status: 400 });
    }

    return NextResponse.json(newPairing, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Error generating pairing', { status: 400 });
  }
}

export const runtime = 'edge';
