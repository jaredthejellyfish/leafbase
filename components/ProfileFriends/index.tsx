import {
  createServerComponentClient,
  type Session,
} from '@supabase/auth-helpers-nextjs';
import { ArrowRight } from 'lucide-react';
import { cookies } from 'next/headers';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

import type { FriendExtended } from '@/lib/database/database_types';
import Friend from './Friend';

const FullScreenButton = dynamic(() => import('./FullScreenButton'), {
  ssr: false,
});

type Props = {
  session: Session | null;
};

export default async function ProfileFriends({ session }: Props) {
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
    <div className="relative flex w-full flex-col rounded-xl px-7 py-3 pb-4 shadow-md dark:bg-zinc-900">
      <div className="mb-1.5 flex w-full flex-row items-center justify-between">
        <div className="flex flex-row gap-x-3">
          <h3 className="text-xl font-bold">Friends</h3>
          {friends.length > 2 && (
            <FullScreenButton session={session} friends={friends} />
          )}
        </div>
        <Link href={'/profile?cr=comments'}>
          <ArrowRight className="cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
        </Link>
      </div>
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
