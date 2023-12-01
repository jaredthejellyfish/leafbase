import {
  createServerComponentClient,
  type Session,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import React from 'react';

import type { FriendExtended } from '@/lib/database/database_types';
import FullScreenButton from './FullScreenButton';
import { cn } from '@/lib/utils/cn';
import Friend from './Friend';

type Props = {
  session: Session | null;
};

export default async function Friends({ session }: Props) {
  if (!session) return null;

  const supabase = createServerComponentClient({ cookies: () => cookies() });

  const { data: friendsData } = await supabase
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
    )`
    )
    .or(`from.eq.${session.user.id},to.eq.${session.user.id}`)
    .returns<FriendExtended[]>();

  if (!friendsData || friendsData.length < 1) return null;

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

  return (
    <div
      className={cn(
        'flex w-full flex-col rounded-xl px-7 py-3 pb-4 shadow-md dark:bg-zinc-900 relative',
        friends.length > 2 && 'pb-3'
      )}
    >
      <FullScreenButton session={session} friends={friends} />
      <h3 className="mb-1.5 text-xl font-bold">Friends</h3>
      <div className="flex flex-col gap-y-2">
        {friends &&
          friends.length > 0 &&
          friends.map((friend, index) => {
            if (index > 2) return null;

            if (friend.pending && friend.from.id === session.user.id)
              return (
                <Friend
                  key={index}
                  friend={friend}
                  status={'pending'}
                  useTo={friend.to.id !== session.user.id}
                />
              );
            if (friend.from.id !== session.user.id && friend.pending)
              return (
                <Friend
                  key={index}
                  friend={friend}
                  status={'toAccept'}
                  useTo={friend.to.id !== session.user.id}
                />
              );
            if (
              (friend.from.id === session.user.id && !friend.pending) ||
              (friend.to.id === session.user.id && !friend.pending)
            )
              return (
                <Friend
                  key={index}
                  friend={friend}
                  status={'accepted'}
                  useTo={friend.to.id !== session.user.id}
                />
              );
          })}
      </div>
    </div>
  );
}
