'use server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database';

type ExtendedComment = {
  id: string;
  created_at: string;
  strain_id: string;
  user_id: string;
  comment: string;
  strain: { slug: string };
};

export async function deleteComment(comment_id: string) {
  try {
    if (!comment_id) {
      return { error: 'Invalid request', deleted: false };
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
      return { error: 'Error getting session', deleted: false };
    }

    const { data: commentData, error: commentError } = await supabase
      .from('strain_comments')
      .select('*, strain:strain_id(slug)')
      .eq('id', comment_id)
      .returns<ExtendedComment[]>();

    if (commentError) {
      console.error(commentError);
      return { error: 'Error getting comment', deleted: false };
    }

    if (
      commentData.length === 1 &&
      commentData[0].user_id !== session.user.id
    ) {
      console.error('User does not own comment');
      return { error: 'Error deleting comment', deleted: false };
    }

    const strainSlug = commentData[0].strain.slug;

    const { error: deleteCommentError } = await supabase
      .from('strain_comments')
      .delete()
      .eq('id', comment_id);

    if (deleteCommentError) {
      console.error(deleteCommentError);
      return { error: 'Error deleting comment', deleted: false };
    }

    revalidatePath(`/strain/${strainSlug}`);
    return { error: null, deleted: true };
  } catch (error) {
    console.error(error);
    return { error: 'Error deleting comment', deleted: false };
  }
}
