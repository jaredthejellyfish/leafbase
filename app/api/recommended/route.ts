import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import type { Database } from '@/lib/database';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const page = Number(requestUrl.searchParams.get('page')) || 0;

  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookies(),
  });

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    return NextResponse.json({ error: sessionError }, { status: 500 });
  }

  const { data: likedStrains, error: likedStrainsError } = await supabase
    .from('strain_likes')
    .select('strain_id')
    .eq('user_id', session?.user.id);

  if (likedStrainsError) {
    return NextResponse.json({ error: likedStrainsError }, { status: 500 });
  }

  const flattenedLikedStrains = likedStrains
    ?.map((strain) => strain.strain_id)
    .filter((strain) => strain !== null) as string[];

  const { data: pairings, error } = await supabase.rpc(
    'get_strains_by_preference',
    {
      liked_strains: flattenedLikedStrains,
      limit_val: 5,
      offset_val: page * 5,
    },
  );

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }


  return NextResponse.json({ pairings });
}
