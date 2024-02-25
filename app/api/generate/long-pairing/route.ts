import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

import type { Database } from '@/lib/database';

const openai = new OpenAI();

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const strain1 = searchParams.get('strain1');
    const strain2 = searchParams.get('strain2');

    if (!strain1 || !strain2) {
      return NextResponse.json('No strains in the request', { status: 400 });
    }

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore,
    });

    const { data: existingPairing } = await supabase
      .from('long_pairings')
      .select('*')
      .eq('strain1_id', strain1)
      .eq('strain2_slug', strain2)
      .maybeSingle();

    if (existingPairing) {
      return NextResponse.json(existingPairing, {
        status: 200,
        headers: {
          'Cache-Control': 'max-age=90',
          'CDN-Cache-Control': 'max-age=3600',
          'Vercel-CDN-Cache-Control': 'max-age=28800',
        },
      });
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
      return NextResponse.json('No strains in the database response', {
        status: 400,
      });
    }

    const strain1Name = strain1Data.name;
    const strain2Name = strain2Data.name;

    const formattedStrain1 = `\`\`\`${strain1Name}\n${JSON.stringify(
      strain1Data,
    )}\`\`\``;
    const formattedStrain2 = `\`\`\`${strain2Name}\n${JSON.stringify(
      strain2Data,
    )}\`\`\``;

    const prompt = `${formattedStrain1}\n${formattedStrain2}\n\nDescribe how ${strain1Name} and ${strain2Name} would mix together.`;

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
      return NextResponse.json('Error generating pairing', { status: 400 });
    }

    return NextResponse.json(newPairing, {
      status: 200,
      headers: {
        'Cache-Control': 'max-age=90',
        'CDN-Cache-Control': 'max-age=3600',
        'Vercel-CDN-Cache-Control': 'max-age=28800',
      },
    });
  } catch (error) {
    return NextResponse.json('Error generating pairing', { status: 400 });
  }
}
