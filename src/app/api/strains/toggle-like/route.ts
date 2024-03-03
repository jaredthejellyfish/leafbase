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

    const { data: existingLike, error: existingLikeError } = await supabase
      .from('strain_likes')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('strain_id', strain_id)
      .maybeSingle();

    if (existingLikeError) {
      return NextResponse.json(existingLikeError.message, { status: 500 });
    }

    if (existingLike) {
      const { error: deleteError } = await supabase
        .from('strain_likes')
        .delete()
        .eq('id', existingLike.id);

      if (deleteError) {
        return NextResponse.json(deleteError.message, { status: 500 });
      }
    } else {
      const { error: insertError } = await supabase
        .from('strain_likes')
        .insert([{ user_id: session.user.id, strain_id }]);
      if (insertError) {
        return NextResponse.json(insertError.message, { status: 500 });
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json('Something went wrong', { status: 500 });
  }
}

export const runtime = 'edge';
