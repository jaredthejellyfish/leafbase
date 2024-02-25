import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

import { type Database } from '@/lib/database';
import { type StrainData } from '@/lib/types';

interface Score {
  [key: string]: number;
}

type Data = {
  thc: number;
  effects: Record<string, number>;
  terps: Record<string, number>;
};

const openai = new OpenAI();

const templates = [
  'I would like to order a strain that is <high | low | medium> thc. I usually go for something that makes me feel <insert effects> and that tastes <get taste from terps but do not list effect names>. What would you recommend?',
  "Hey there! I'm in the mood for a strain with <high | low | medium> THC levels. I love it when it gives me that <insert effects> feeling, and I'm a big fan of flavors that taste <get taste from terps but do not list effect names>. Got any suggestions?",
  "Looking for a bit of guidance here. I prefer my cannabis to be <high | low | medium> on the THC side, and I'm all about those <insert effects> vibes. Also, a taste that's <get taste from terps but do not list effect names> would be perfect. What do you think would hit the spot?",
  "Could use your expertise! I'm after something with <high | low | medium> THC content. I really enjoy a strain that leaves me feeling <insert effects>, plus it's gotta have that <get taste from terps but do not list effect names> flavor. Any recommendations?",
  "I'm on the hunt for a strain that's <high | low | medium> in THC. I'm chasing the <insert effects> effect and a taste that's all about <get taste from terps but do not list effect names>. What's your top pick?",
  "Need some help picking out my next strain. I'm looking for something with a <high | low | medium> THC level, something that'll make me feel <insert effects>, and with a flavor profile that's <get taste from terps but do not list effect names>. What would you recommend for me?",
  "Casually browsing for my next favorite strain with a <high | low | medium> THC concentration. I'm really aiming for that <insert effects> sensation, coupled with a flavor that whispers <get taste from terps but do not list effect names>. Any favorites you'd suggest?",
  "Hey! On a quest for a strain that's rocking a <high | low | medium> THC vibe. I'm all about achieving that <insert effects> state, and I can't resist a strain that tastes <get taste from terps but do not list effect names>. What's your go-to recommendation?",
  "In the market for something with <high | low | medium> THC. I'm keen on feeling <insert effects>, and I have a soft spot for flavors that are <get taste from terps but do not list effect names>. Any strains come to mind?",
  "Hello! Diving into the world of strains, I'm looking for one with a <high | low | medium> THC level. I'm chasing after that <insert effects> feeling, and it's essential it tastes <get taste from terps but do not list effect names>. What would you point me towards?",
  "Curious to explore a strain that's <high | low | medium> on the THC scale. I'm all for experiencing <insert effects> and indulging in a flavor that's uniquely <get taste from terps but do not list effect names>. Got any leads on what I should try next?",
  "Just pondering over what strain to try next. I'm aiming for something with a <high | low | medium> THC punch, that delivers a solid <insert effects> mood, and tantalizes with a <get taste from terps but do not list effect names> taste. Any stellar picks you'd recommend?",
];

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

  if (sessionError || !session || !session.user) {
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
        score: strain.effects[effectName].score,
      };
    });
  });

  const terps = strainsData.map((strain) => {
    const terpNames = Object.keys(strain.terps);
    return terpNames.map((terpName) => {
      return {
        name: terpName,
        score: strain.terps[terpName].score,
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
        acc += strain.thcPercent || 0;
        return acc;
      }, 1) / strainsData.length
    ).toFixed(2),
  );

  const completion = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    messages: [
      {
        role: 'system',
        content: 'You specialise in generating orders for marijuana strains.',
      },
      {
        role: 'user',
        content: basePrompt(
          {
            thc: aggregatedTHCPercents,
            effects: aggregatedEffects,
            terps: aggregatedTerps,
          },
          templates[Math.floor(Math.random() * templates.length)],
        ),
      },
    ],
    temperature: 0.1,
    max_tokens: 250,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return NextResponse.json(
    {
      order: completion.choices[0].message.content,
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'max-age=90',
        'CDN-Cache-Control': 'max-age=3600',
        'Vercel-CDN-Cache-Control': 'max-age=28800',
      },
    },
  );
}

export const runtime = 'edge';
