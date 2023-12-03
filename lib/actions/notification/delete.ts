'use server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database';

export async function deleteNotification(id: string) {
  try {
    if (!id) {
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

    const { data: existingNotification, error: existingNotificationError } =
      await supabase
        .from('notifications')
        .select('*')
        .eq('id', id)
        .maybeSingle();

    if (existingNotificationError) {
      return {
        error: 'Error getting notification',
        deleted: false,
      };
    }

    if (!existingNotification) {
      return {
        error: 'No friend notification found',
        deleted: false,
      };
    }

    const { error: newNotificationError } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id);

    if (newNotificationError) {
      return {
        error: 'Error updating notification',
        deleted: false,
      };
    }

    return { error: null, deleted: true };
  } catch (error) {
    console.error(error);
    return { error: 'Error accepting friend request', deleted: false };
  } finally {
    revalidatePath('/profile');
  }
}
