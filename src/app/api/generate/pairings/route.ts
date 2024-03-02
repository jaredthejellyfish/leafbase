import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { Database } from '@/lib/database';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const id = searchParams.get('id');
  const slug = searchParams.get('slug');
  const limit = searchParams.get('limit');

  if (!slug || !id)
    return NextResponse.json({ error: 'No search query provided' });

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const { data: existingPairings, error: existingPairingsError } =
    await supabase
      .from('short_pairings')
      .select('*')
      .eq('strain1_id', id)
      .limit(3);

  if (!existingPairingsError && existingPairings?.length > 0) {
    if (existingPairings.length !== 3) {
      await supabase.from('short_pairings').delete().match({
        strain1_id: id,
      });
    } else {
      return NextResponse.json(
        { pairings: existingPairings },
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
  }

  const { data: pairings, error } = await supabase.rpc('find_closest_strains', {
    input_slug: slug,
    limit_count: limit ? Math.min(parseInt(limit), 5) : 3,
  });

  if (pairings?.length === 0) {
    return NextResponse.json({ error: 'No results found' }, { status: 500 });
  }

  if (error) {
    return NextResponse.json(
      { error: 'Error fetching search results' },
      { status: 500 },
    );
  }

  const formattedPairings = pairings.map((pairing) => ({
    body: null,
    created_at: null,
    id: null,
    image: pairing.nug_image,
    strain1_id: id,
    strain2_id: pairing.strain_id,
    strain2_slug: pairing.slug,
  }));

  return NextResponse.json(
    { pairings: formattedPairings },
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
