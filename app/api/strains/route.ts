import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { unstable_cache } from 'next/cache';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import type { Database } from '@/lib/database';
import type { Strain } from '@/lib/types';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);

    const pageParam = Number(searchParams.get('page') || 0);
    const perPage = Number(searchParams.get('perPage') || 8);
    const filter = searchParams.get('filter') || 're';

    const offset = pageParam * perPage;

    const nameFilter = filter === 'za' ? false : true;

    const orderByLikes = filter && filter !== 're' ? false : true;

    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookies(),
    });

    const getData = unstable_cache(async () => {
      let query = supabase
        .from('strains')
        .select('*', { count: 'estimated', head: false });

      if (orderByLikes) {
        query = query.order('likes_count', { ascending: false });
      }

      query = query
        .order('name', { ascending: nameFilter })
        .range(offset, offset + perPage - 1);

      const { data: strains } = await query.returns<Strain[]>();

      return strains;
    }, ['dynamic-pages', filter, pageParam.toString()]);

    const strains = await getData();

    return NextResponse.json(
      {
        strains,
        page: pageParam,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json('Something went wrong', { status: 500 });
  }
}
