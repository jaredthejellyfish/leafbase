import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

import { type Database } from '@l/database';
import { type StrainData } from '@l/types';

type Score = Record<string, number>;

type Data = {
  thc: number;
  effects: Record<string, number>;
  terps: Record<string, number>;
};

const openai = new OpenAI();

const basePrompt = (
  data: Data,
  selectedTemplate: string,
) => `Based on this data:
${JSON.stringify(data, null, 2)}
Generate a sentence someone may use to order a strain of weed at their local dispensary. Start it with "${selectedTemplate}". Feel free to modify this text as you see fit, you are a customer and you have thoughts opinions and ideas.`;

export async function GET() {
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookies(),
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  const { session } = sessionData;

  if (sessionError ?? !session?.user) {
    return NextResponse.json('Error getting session', { status: 400 });
  }

  const { data: likedStrains, error: likedStrainsError } = await supabase
    .from('strain_likes')
    .select('strain_id, strain_id:strains (effects, id)')
    .eq('user_id', session.user.id);

  if (likedStrainsError) {
    return NextResponse.json('Error getting liked strains', { status: 400 });
  }

  const likedStrainIds = likedStrains.map((strain) => {
    return { id: strain.strain_id?.id };
  });

  const { data: strainsData, error: strainsDataError } = await supabase
    .from('strains')
    .select('slug, thcPercent, effects, terps')
    .in(
      'id',
      likedStrainIds.map((strain) => strain.id),
    )
    .returns<StrainData[]>();

  if (strainsDataError) {
    return NextResponse.json('Error getting strain data', { status: 400 });
  }

  const effects = strainsData.map((strain) => {
    const effectNames = Object.keys(strain.effects);
    return effectNames.map((effectName) => {
      return {
        name: effectName,
        score: strain.effects[effectName]?.score ?? 0,
      };
    });
  });

  const terps = strainsData.map((strain) => {
    const terpNames = Object.keys(strain.terps);
    return terpNames.map((terpName) => {
      return {
        name: terpName,
        score: strain.terps[terpName]?.score ?? 0,
      };
    });
  });

  const aggregatedEffects = effects.reduce((acc, effect) => {
    effect.forEach((e) => {
      if (acc[e.name]) {
        acc[e.name] += e.score;
      } else {
        acc[e.name] = e.score;
      }
    });
    return acc;
  }, {} as Score);

  const aggregatedTerps = terps.reduce((acc, terp) => {
    terp.forEach((t) => {
      if (acc[t.name]) {
        acc[t.name] += t.score;
      } else {
        acc[t.name] = t.score;
      }
    });
    return acc;
  }, {} as Score);

  const aggregatedTHCPercents = Number(
    (
      strainsData.reduce((acc, strain) => {
        acc += strain.thcPercent ?? 0;
        return acc;
      }, 1) / strainsData.length
    ).toFixed(2),
  );

  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content:
          'You specialise in generating recommendations for what kind of marijuana strains to order.',
      },
      {
        role: 'user',
        content: basePrompt(
          {
            thc: aggregatedTHCPercents,
            effects: aggregatedEffects,
            terps: aggregatedTerps,
          },
          "Based on your preferences, I'd recommend a strain that offers <high | low | medium> THC, <insert effects> experience and a taste that's <get taste from terps but do not list terp names>. That should be ideal for <insert use case>.",
        ),
      },
    ],
    temperature: 1,
    max_tokens: 250,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
  });

  const stream = OpenAIStream(completion);

  return new StreamingTextResponse(stream);
}

export const runtime = 'edge';
