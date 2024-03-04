import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { kv } from '@vercel/kv';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import type { Database } from '@l/database';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);

    const query = searchParams.get('query');

    if (!query) return NextResponse.json('No query provided', { status: 400 });

    const storedSearchResults = await kv.get(
      `search-${query.replace(/[^\w\s-]/g, '-')}`,
    );

    if (storedSearchResults)
      return NextResponse.json(
        { data: storedSearchResults },
        {
          status: 200,
          headers: {
            'Cache-Control': 'max-age=90',
            'CDN-Cache-Control': 'max-age=3600',
            'Vercel-CDN-Cache-Control': 'max-age=28800',
          },
        },
      );

    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookies(),
    });

    const { data, error } = await supabase.rpc('search_strains', {
      search_term: query ?? '',
      limit_num: 5,
    });

    if (!data || error)
      return NextResponse.json('No data found', { status: 404 });

    await kv.set(`search-${query.replace(/[^\w\s-]/g, '-')}`, data, {
      ex: 60 * 60 * 24 * 7,
    });

    return NextResponse.json(
      {
        data,
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
  } catch (error) {
    return NextResponse.json('Something went wrong', { status: 500 });
  }
}

export const runtime = 'edge';
