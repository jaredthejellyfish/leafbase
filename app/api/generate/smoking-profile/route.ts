import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import type { AggregatedData, StrainData } from '@/lib/types';
import type { Database } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const returnPartial = searchParams.get('combo');
    const returnTerpenes = searchParams.get('terpenes');
    const returnEffects = searchParams.get('effects');

    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookies(),
    });

    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    const { session } = sessionData;

    if (sessionError || !session || !session.user) {
      console.error(sessionError);
      return NextResponse.json('Error getting session', { status: 400 });
    }

    const { data: likedStrains, error: likedStrainsError } = await supabase
      .from('strain_likes')
      .select('strain_id, strain_id:strains (effects, id)')
      .eq('user_id', session.user.id);

    if (likedStrainsError) {
      console.error(likedStrainsError);
      return NextResponse.json('Error getting liked strains', { status: 400 });
    }

    const likedStrainIds = likedStrains.map((strain) => {
      return { id: strain.strain_id?.id };
    });

    const { data: strainEffects, error: strainEffectsError } = await supabase
      .from('strains')
      .select('thcPercent, effects, terps')
      .in(
        'id',
        likedStrainIds.map((strain) => strain.id)
      )
      .returns<StrainData[]>();

    if (strainEffectsError) {
      console.error(strainEffectsError);
      return NextResponse.json('Error getting strain effects', { status: 400 });
    }

    const aggregatedData: AggregatedData = {
      averageThcPercent: 0,
      effectScores: {},
      terpeneScores: {},
    };

    let thcTotal = 0;
    let thcCount = 0;

    strainEffects.forEach((strain) => {
      // Aggregate THC percent
      if (strain.thcPercent !== null) {
        thcTotal += strain.thcPercent;
        thcCount++;
      }

      // Aggregate effects
      Object.values(strain.effects).forEach((effect) => {
        if (!aggregatedData.effectScores[effect.name]) {
          aggregatedData.effectScores[effect.name] = 0;
        }
        aggregatedData.effectScores[effect.name] += effect.score;
      });

      // Aggregate terpenes
      Object.values(strain.terps).forEach((terpene) => {
        if (!aggregatedData.terpeneScores[terpene.name]) {
          aggregatedData.terpeneScores[terpene.name] = 0;
        }
        aggregatedData.terpeneScores[terpene.name] += terpene.score;
      });
    });

    // Calculate average THC percent
    aggregatedData.averageThcPercent = thcTotal / thcCount;

    const amountToReturn = returnEffects ? 8 : 4;

    const effects = Object.entries(aggregatedData.effectScores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, returnPartial ? amountToReturn : undefined)
      .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {}) as {
      [key: string]: number;
    };

    const terpenes = Object.entries(aggregatedData.terpeneScores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, returnPartial ? amountToReturn : undefined)
      .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {}) as {
      [key: string]: number;
    };

    // Merge the flattened effects and terpenes into a single object
    const flattenedResponse = {
      thc: aggregatedData.averageThcPercent,
      ...effects,
      ...terpenes,
    };

    // Find the maximum and minimum values in the flattenedResponse object
    const values = Object.values(flattenedResponse);
    const maxVal = Math.max(...values);
    const minVal = Math.min(...values);

    // Calculate the shift needed to make all values positive
    const shift = minVal < 0 ? Math.abs(minVal) : 0;

    // Normalize each value in the flattenedResponse object
    const normalizedResponse: { [key: string]: number } = {};
    for (const [key, val] of Object.entries(flattenedResponse)) {
      normalizedResponse[key] = ((val + shift) / (maxVal + shift)) * 50;
    }

    if (returnEffects) {
      const normalizedEffects: { [key: string]: number } = {};
      for (const [key, val] of Object.entries(effects)) {
        normalizedEffects[key] = ((val + shift) / (maxVal + shift)) * 50;
      }

      return NextResponse.json({ data: normalizedEffects }, { status: 200 });
    }

    if (returnTerpenes) {
      const normalizedTerpenes: { [key: string]: number } = {};
      for (const [key, val] of Object.entries(terpenes)) {
        normalizedTerpenes[key] = ((val + shift) / (maxVal + shift)) * 50;
      }

      return NextResponse.json({ data: normalizedTerpenes }, { status: 200 });
    }

    return NextResponse.json({ data: normalizedResponse }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Error generating smoking profile', {
      status: 500,
    });
  }
}

export const dynamic = 'force-dynamic';
