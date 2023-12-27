import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { Database } from '@/lib/database';
import type { StrainData } from '@/lib/types';

interface Score {
  [key: string]: number;
}

type Data = {
  thc: number;
  effects: Record<string, number>;
  terps: Record<string, number>;
};

function mapValues(data: Data): Data {
  const mapToRange = (value: number, min: number, max: number) =>
    (value - min) / (max - min);

  const effectsValues = Object.values(data.effects);
  const effectsMin = Math.min(...effectsValues);
  const effectsMax = Math.max(...effectsValues);

  const terpsValues = Object.values(data.terps);
  const terpsMin = Math.min(...terpsValues);
  const terpsMax = Math.max(...terpsValues);

  const mappedEffects = Object.fromEntries(
    Object.entries(data.effects).map(([key, value]) => [
      key,
      mapToRange(value, effectsMin, effectsMax),
    ]),
  );

  const mappedTerps = Object.fromEntries(
    Object.entries(data.terps).map(([key, value]) => [
      key,
      mapToRange(value, terpsMin, terpsMax),
    ]),
  );

  return { ...data, effects: mappedEffects, terps: mappedTerps };
}

export async function GET() {
  try {
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

    return NextResponse.json(
      mapValues({
        thc: aggregatedTHCPercents,
        effects: aggregatedEffects,
        terps: aggregatedTerps,
      }),
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json('Error generating smoking profile', {
      status: 500,
    });
  }
}

export const dynamic = 'force-dynamic';
