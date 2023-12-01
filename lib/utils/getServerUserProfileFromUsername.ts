import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Session } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { PublicProfile } from '../database/database_types';
import type { Database } from '@/lib//database';

export async function getServerUserProfileFromUsername(
  username: string
): Promise<{
  status: 'success' | null;
  error: string | null;
  user: PublicProfile | null;
  session: Session | null;
  friendRequest?: {
    created_at: string;
    from: string;
    id: string;
    pending: boolean;
    to: string;
  } | null;
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
      session: null,
      friendRequest: null,
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
      session: null,
      friendRequest: null,
    };
  }

  const { data: pendingFriendRequest, error: pendingFriendRequestError } =
    await supabase
      .from('friends')
      .select('*')
      .or(`to.eq.${user.id},from.eq.${user.id}`)
      .maybeSingle();

  if (pendingFriendRequestError) {
    console.error(pendingFriendRequestError);
    return {
      status: null,
      error: 'Could not find user in friends.',
      user: null,
      session: null,
      friendRequest: null,
    };
  }

  return {
    status: 'success',
    error: null,
    session: session,
    user,
    friendRequest: pendingFriendRequest,
  };
}
