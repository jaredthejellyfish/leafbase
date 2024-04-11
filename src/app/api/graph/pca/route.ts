import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { PCA } from 'ml-pca';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { Database } from '@l/database';

export async function GET() {
  try {
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookies(),
    });

    const {
      data: { user },
      error: sessionError,
    } = await supabase.auth.getUser();

    if (sessionError ?? !user) {
      return NextResponse.json('Error getting session', { status: 400 });
    }

    const { data: likedStrains, error: likedStrainsError } = await supabase
      .from('strain_likes')
      .select('strain_id, strain_id:strains (name, id)')
      .eq('user_id', user.id);

    if (likedStrainsError) {
      return NextResponse.json('Error getting liked strains', { status: 400 });
    }

    const likedStrainIds = likedStrains.map((strain) => strain.strain_id?.id);

    const { data: likedStrainsVectors, error: likedStrainsVectorsError } =
      await supabase
        .from('strains_vectors')
        .select('strain_id, vector')
        .in('strain_id', likedStrainIds);

    if (likedStrainsVectorsError) {
      return NextResponse.json('Error getting liked strains vectors', {
        status: 400,
      });
    }

    const likedStrainsVectorsArray = likedStrainsVectors.map(
      (strain) => JSON.parse(strain.vector) as number[],
    );

    const pca = new PCA(likedStrainsVectorsArray);
    const transformedData = pca.predict(likedStrainsVectorsArray, {
      nComponents: 2,
    });

    // Extract X and Y coordinates for each vector
    const pcaOutput = transformedData.transpose().to1DArray();

    const xyCoordinates: { x: number; y: number; label: string }[] = [];

    for (let i = 0; i < pcaOutput.length; i += 2) {
      const x = pcaOutput[i];
      const y = pcaOutput[i + 1];
      // Use a null check for strain_id and provide a fallback label if necessary
      const label = likedStrains[i / 2]?.strain_id?.name ?? 'Unknown Strain';
      if (typeof x !== 'number' || typeof y !== 'number') {
        continue;
      }
      xyCoordinates.push({ x, y, label });
    }

    return NextResponse.json(
      { pca: xyCoordinates },
      {
        status: 200,
        headers: {
          'Cache-Control': 'max-age=90',
          'CDN-Cache-Control': 'max-age=3600',
          'Vercel-CDN-Cache-Control': 'max-age=28800',
        },
      },
    );
  } catch (error) {
    return NextResponse.json('Error generating PCA', { status: 400 });
  }
}

export const runtime = 'edge';
