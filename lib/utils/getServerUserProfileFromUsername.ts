import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { PublicProfile } from '../database/database_types';
import type { Database } from '@/lib//database';

export async function getServerUserProfileFromUsername(
  username: string
): Promise<{
  status: 'success' | null;
  error: string | null;
  user: PublicProfile | null;
  hasPendingFriendRequest: boolean;
  isFriends: boolean;
}> {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      status: null,
      error: 'You must be logged in to view this page.',
      user: null,
      hasPendingFriendRequest: false,
      isFriends: false,
    };
  }

  const { data: user, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (!user || error) {
    return {
      status: null,
      error: 'Could not find user.',
      user: null,
      hasPendingFriendRequest: false,
      isFriends: false,
    };
  }

  const { data: pendingFriendRequest, error: pendingFriendRequestError } =
    await supabase
      .from('friends')
      .select('*')
      .match({
        to: user.id,
        from: session.user.id,
      })
      .maybeSingle();

  if (pendingFriendRequestError) {
    return {
      status: null,
      error: 'Could not find user in friends.',
      user: null,
      hasPendingFriendRequest: false,
      isFriends: false,
    };
  }

  const hasPendingFriendRequest = pendingFriendRequest?.pending ?? false;
  const isFriends = hasPendingFriendRequest
    ? false
    : pendingFriendRequest?.pending == false;

  return {
    status: 'success',
    error: null,
    user,
    hasPendingFriendRequest,
    isFriends,
  };
}
