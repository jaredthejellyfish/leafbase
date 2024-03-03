import type { Session, SupabaseClient } from '@supabase/auth-helpers-nextjs';

import type { Database } from '@l/database';
import type { FriendExtended } from '@l/types';

export async function getServerFriends(
  supabase: SupabaseClient<Database>,
  session?: Session,
) {
  if (!session) return { friends: null, error: 'No session' };

  const { data: friendsData, error } = await supabase
    .from('friends')
    .select(
      `*,
  to:profiles!friends_to_fkey (
    id,
    username,
    name,
    image
  ),
  from:profiles!friends_from_fkey (
    id,
    username,
    name,
    image
  )`,
    )
    .or(`from.eq.${session?.user.id},to.eq.${session?.user.id}`)
    .returns<FriendExtended[]>();

  if (error) return { friends: null, error };

  const friends = friendsData?.map((friend) => {
    return {
      ...friend.to,
      pending: friend.pending,
      from: friend.from,
      to: friend.to,
    };
  });

  friends.sort((a, b) => {
    if (a.pending && !b.pending) return -1;
    if (!a.pending && b.pending) return 1;
    return 0;
  });

  return { friends, error: null };
}
