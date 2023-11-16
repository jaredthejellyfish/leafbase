import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const id = searchParams.get('id');
  const search = searchParams.get('query');
  const limit = searchParams.get('limit');

  if (!search || !id)
    return NextResponse.json({ error: 'No search query provided' });

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const { data: existingPairings, error: existingPairingsError } =
    await supabase.from('short_pairings').select('*').eq('strain1_id', id);

  if (!existingPairingsError && existingPairings?.length > 0) {
    return NextResponse.json({ pairings: existingPairings });
  }

  const { data: pairings, error } = await supabase.rpc('find_closest_strains', {
    input_slug: search,
    limit_count: limit ? Math.min(parseInt(limit), 5) : 3,
  });

  if (pairings?.length === 0) {
    return NextResponse.json({ error: 'No results found' }, { status: 500 });
  }

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error fetching search results' },
      { status: 500 }
    );
  }

  const formattedPairings = pairings.map((pairing) => ({
    body: null,
    created_at: null,
    id: null,
    image: null,
    strain1_id: id,
    strain2_id: pairing.strain_id,
  }));

  return NextResponse.json({ pairings: formattedPairings });
}
