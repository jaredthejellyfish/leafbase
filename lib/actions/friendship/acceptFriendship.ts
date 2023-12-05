'use server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database';

export async function acceptFriendship(to: string, from: string) {
  try {
    if (!to || !from) {
      return { error: 'Invalid request', accepted: false };
    }
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookies(),
    });

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session || !session.user) {
      return { error: 'Error getting session', accepted: false };
    }

    if (session.user.id !== to) {
      return { error: 'Invalid user', accepted: false };
    }

    const { data: existingFriendRequest, error: existingFriendRequestError } =
      await supabase
        .from('friends')
        .select('*')
        .match({
          to: to,
          from: from,
        })
        .maybeSingle();

    if (existingFriendRequestError) {
      return {
        error: 'Error getting friend request',
        accepted: false,
      };
    }

    if (!existingFriendRequest) {
      return {
        error: 'No friend request found',
        accepted: false,
      };
    }

    const { error: newFriendRequestError } = await supabase
      .from('friends')
      .update({ pending: false })
      .match({
        to: session.user.id,
        from: from,
      })
      .select()
      .single();

    if (newFriendRequestError) {
      return {
        error: 'Error accepting friend request',
        accepted: false,
      };
    }
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .match({ id: to })
      .single();

    if (!profileError && profile) {
      await supabase.from('notifications').insert({
        initiator: session.user.id,
        recipient: from,
        type: 'friend-request',
        content: `@${profile.username} accepted your friend request!`,
        archived: false,
        image: profile.image,
      });
    }

    return { accepted: true, error: null };
  } catch (error) {
    return { error: 'Error accepting friend request', accepted: false };
  } finally {
    revalidatePath('/profile');
  }
}
