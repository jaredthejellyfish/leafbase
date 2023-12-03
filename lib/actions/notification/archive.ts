'use server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database';

export async function archiveNotification(id: string) {
  try {
    if (!id) {
      return { error: 'Invalid request', archived: false };
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
      return { error: 'Error getting session', archived: false };
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
        archived: false,
      };
    }

    if (!existingNotification) {
      return {
        error: 'No friend notification found',
        archived: false,
      };
    }

    const { error: newNotificationError } = await supabase
      .from('notifications')
      .update({ archived: true })
      .eq('id', id);

    if (newNotificationError) {
      return {
        error: 'Error updating notification',
        archived: false,
      };
    }

    return { error: null, archived: true };
  } catch (error) {
    console.error(error);
    return { error: 'Error accepting friend request', archived: false };
  } finally {
    revalidatePath('/profile');
  }
}
