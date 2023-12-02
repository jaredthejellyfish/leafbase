'use server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database';

export async function comment(
  strainId: string,
  strainSlug: string,
  comment: string
) {
  try {
    if (!comment || !strainId || !strainSlug) {
      return { error: 'Invalid request', created: false };
    }
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookies(),
    });

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session || !session.user) {
      console.error(sessionError);
      return { error: 'Error getting session', created: false };
    }

    const { error: newCommentError } = await supabase
      .from('strain_comments')
      .insert({
        strain_id: strainId,
        user_id: session.user.id,
        comment: comment,
      });

    if (newCommentError) {
      console.error(newCommentError);
      return { error: 'Error adding comment', created: false };
    }

    return { error: null, created: true };
  } catch (error) {
    console.error(error);
    return { error: 'Error accepting friend request', created: false };
  } finally {
    revalidatePath(`/strain/${strainSlug}`);
  }
}
