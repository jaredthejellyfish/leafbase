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

    const { data: existingPairing, error: existingPairingError } =
      await supabase
        .from('long_pairings')
        .select('*')
        .eq('strain1_id', strain1)
        .eq('strain2_slug', strain2)
        .maybeSingle();

    if (existingPairingError) {
      console.error(existingPairingError);
    }

    if (existingPairing) {
      return NextResponse.json(existingPairing, { status: 200 });
    }

    const { data: strain1Data, error: strain1Error } = await supabase
      .from('strains')
      .select('*')
      .eq('id', strain1)
      .single();
    const { data: strain2Data, error: strain2Error } = await supabase
      .from('strains')
      .select('*')
      .eq('slug', strain2)
      .single();

    if (strain1Error || strain2Error) {
      console.error(
        strain1Error || strain2Error || 'No strains in the database response'
      );
      return NextResponse.json('No strains in the database response', {
        status: 400,
      });
    }

    const strain1Name = strain1Data.name;
    const strain2Name = strain2Data.name;

    const formattedStrain1 = `\`\`\`${strain1Name}\n${JSON.stringify(
      strain1Data
    )}\`\`\``;
    const formattedStrain2 = `\`\`\`${strain2Name}\n${JSON.stringify(
      strain2Data
    )}\`\`\``;

    const prompt = `${formattedStrain1}\n${formattedStrain2}\n\nDescribe why ${strain1Name} and ${strain2Name} are two strains that go well together.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-1106-preview',
      messages: [
        {
          role: 'system',
          content:
            'You specialise in talking about combinations between marijuana strains. Talk about the flavor and experience a person may feel. Keep your responses under 100 words.',
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
      .from('long_pairings')
      .insert({
        body: completion.choices[0].message.content,
        strain1_id: strain1,
        strain2_id: strain2Data.id,
        strain2_slug: strain2Data.slug,
        strain2_name: strain2Data.name,
        image: strain2Data.nugImage,
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
