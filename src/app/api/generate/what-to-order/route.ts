import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { kv } from '@vercel/kv';
import { MistralStream, StreamingTextResponse } from 'ai';
import Groq from 'groq-sdk';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { type Database } from '@l/database';
import { type StrainData } from '@l/types';
import { env } from '@/env';

const groq = new Groq({
  apiKey: env.GROQ_API_KEY,
});

type Score = Record<string, number>;

type Data = {
  thc: number;
  effects: Record<string, number>;
  terps: Record<string, number>;
};

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

  const res = await groq.chat.completions.create({
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
    model: 'mixtral-8x7b-32768',
    temperature: 1,
    max_tokens: 250,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
  });

  // @ts-expect-error -- API response from groq is not iterpreted properly.
  const stream = MistralStream(res, {
    onCompletion: async (completion) => {
      await kv.set(`what-to-otder-${session.user.id}`, completion, {
        ex: 28800,
      });
    },
  });

  return new StreamingTextResponse(stream);
}

export const runtime = 'edge';
