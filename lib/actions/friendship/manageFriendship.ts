'use server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database';

export async function manageFriendship(
  to: string,
  from: string,
  username: string
) {
  try {
    if (!to || !from || !username) {
      return { error: 'Invalid request', created: false, deleted: false };
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
      return { error: 'Error getting session', created: false, deleted: false };
    }

    const { data: existingFriendRequest, error: existingFriendRequestError } =
      await supabase
        .from('friends')
        .select('*')
        .match({
          from,
          to,
        })
        .maybeSingle();

    if (existingFriendRequestError) {
      return {
        error: 'Error getting friend request',
        created: false,
        deleted: false,
      };
    }

    if (existingFriendRequest) {
      await supabase.from('friends').delete().match({
        from,
        to,
      });

      return { deleted: true, created: false, error: null };
    }

    const { error: newFriendRequestError } = await supabase
      .from('friends')
      .insert({
        from,
        to,
      })
      .select()
      .maybeSingle();

    if (newFriendRequestError) {
      console.error(newFriendRequestError);
      return {
        error: 'Error managing friendship status',
        created: false,
        deleted: false,
      };
    }

    return { created: true, deleted: false, error: null };
  } catch (error) {
    console.error(error);
    return {
      error: 'Error managing friendship status',
      created: false,
      deleted: false,
    };
  } finally {
    revalidatePath(`/profile/${username}`);
    revalidatePath('/profile');
  }
}