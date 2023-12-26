import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const search = searchParams.get('query');

  if (!search) return NextResponse.json({ error: 'No search query provided' });

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const { data: searchResults, error } = await supabase.rpc('search_strains', {
    search_term: search,
    limit_num: 10,
  });

  if (error) {
    return NextResponse.json(
      { error: 'Error fetching search results' },
      { status: 500 },
    );
  }

  return NextResponse.json({ searchResults });
}
