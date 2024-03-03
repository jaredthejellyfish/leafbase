import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import type { Database } from '@l/database';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);

    const strain_id = searchParams.get('strain');

    if (!strain_id) {
      return NextResponse.json('Strain not found', { status: 404 });
    }

    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookies(),
    });

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError ?? !session) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }

    const { data, error } = await supabase
      .from('strain_likes')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('strain_id', strain_id)
      .maybeSingle();

    if (error) {
      return NextResponse.json(error.message, { status: 500 });
    }

    return NextResponse.json(
      {
        like: data,
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
