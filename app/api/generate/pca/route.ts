import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PCA } from 'ml-pca';

import type { Database } from '@/lib/database';

export async function GET() {
  try {
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
      .select('strain_id, strain_id:strains (name, id)')
      .eq('user_id', session.user.id);

    if (likedStrainsError) {
      console.error(likedStrainsError);
      return NextResponse.json('Error getting liked strains', { status: 400 });
    }

    const likedStrainIds = likedStrains.map((strain) => strain.strain_id?.id);

    const { data: likedStrainsVectors, error: likedStrainsVectorsError } =
      await supabase
        .from('strains_vectors')
        .select('strain_id, vector')
        .in('strain_id', likedStrainIds);

    if (likedStrainsVectorsError) {
      console.error(likedStrainsVectorsError);
      return NextResponse.json('Error getting liked strains vectors', {
        status: 400,
      });
    }

    const likedStrainsVectorsArray = likedStrainsVectors.map(
      (strain) => JSON.parse(strain.vector) as number[]
    );

    const pca = new PCA(likedStrainsVectorsArray);
    const transformedData = pca.predict(likedStrainsVectorsArray, {
      nComponents: 2,
    });

    // Extract X and Y coordinates for each vector
    const pcaOutput = transformedData.transpose().to1DArray();

    const xyCoordinates: { x: number; y: number }[] = [];

    for (let i = 0; i < pcaOutput.length; i += 2) {
      const x = pcaOutput[i];
      const y = pcaOutput[i + 1];
      xyCoordinates.push({ x, y });
    }

    return NextResponse.json({ pca: xyCoordinates }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Error generating PCA', { status: 400 });
  }
}
