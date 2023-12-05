'use server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database';

export async function likeComment(comment_id: string, strainSlug: string) {
  try {
    if (!comment_id) {
      return { error: 'Invalid request', liked: false };
    }
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookies(),
    });

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session || !session.user) {
      return { error: 'Error getting session', liked: false };
    }

    const { data: existingLike, error: existingLikeError } = await supabase
      .from('strain_comment_likes')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('comment_id', comment_id)
      .maybeSingle();

    if (existingLikeError) {
      return { error: 'Error getting existing like', liked: false };
    }

    if (existingLike) {
      const { error: deleteLikeError } = await supabase
        .from('strain_comment_likes')
        .delete()
        .eq('id', existingLike.id)
        .eq('user_id', session.user.id)
        .eq('comment_id', comment_id);

      if (deleteLikeError) {
        return { error: 'Error deleting like', liked: false };
      }
      return { error: null, liked: false };
    }

    if (!existingLike) {
      const { error: insertLikeError } = await supabase
        .from('strain_comment_likes')
        .insert([{ comment_id, user_id: session.user.id }])
        .select('id');

      if (insertLikeError) {
        return { error: 'Error inserting like', liked: false };
      }
      return { error: null, liked: true };
    }
  } catch (error) {
    return { error: 'Error deleting comment', liked: false };
  } finally {
    revalidatePath(`/strains/${strainSlug}`); // <- /strain
  }
}
