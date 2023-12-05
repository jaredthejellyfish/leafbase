import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database';

type RequestData = {
  strain_id: string;
  strain_slug: string;
  limit?: string;
};

export async function POST(request: Request) {
  const {
    strain_id: id,
    strain_slug: slug,
    limit,
  } = (await request.json()) as RequestData;

  if (!slug && !id)
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
      return NextResponse.json({ pairings: existingPairings });
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
      { status: 500 }
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

  return NextResponse.json({ pairings: formattedPairings });
}

export const runtime = 'edge';
