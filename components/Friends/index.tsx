import {
  createServerComponentClient,
  type Session,
} from '@supabase/auth-helpers-nextjs';
import { RxCaretDown, RxCaretRight } from 'react-icons/rx';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import AcceptRequestButton from './AcceptRequestButton';
import { cn } from '@/lib/utils/cn';

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
    .or(`from.eq.${session.user.id},to.eq.${session.user.id}`);

  if (!friendsData || friendsData.length < 1) return null;

  const friends = friendsData?.map((friend) => {
    return {
      ...friend.to,
      pending: friend.pending,
      from: friend.from,
      to: friend.to,
    };
  });

  return (
    <div
      className={cn(
        'flex w-full flex-col rounded-xl px-7 py-3 pb-4 shadow-md dark:bg-zinc-900',
        friends.length > 2 && 'pb-3'
      )}
    >
      <h3 className="mb-1.5 text-xl font-bold">Friends</h3>
      <div className="flex flex-col gap-y-2">
        {friends &&
          friends.length > 0 &&
          friends.map((friend, index) => {
            if (index === 3)
              return (
                <div
                  key={index}
                  className="mt-0.5 flex w-full items-center justify-center gap-x-2"
                >
                  <RxCaretDown size={20} />
                  <span className="font-semibold">Show all</span>
                </div>
              );
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

function Friend({
  friend: { to, from },
  status,
  useTo,
}: {
  friend: {
    to: { id: string; username: string; name: string; image: string };
    from: { id: string; username: string; name: string; image: string };
  };
  status: string;
  useTo?: boolean;
}) {
  const user = useTo ? to : from;
  return (
    <Link
      href={`/profile/${user.username}`}
      className="flex flex-row items-center justify-between rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-1.5 dark:border-zinc-700 dark:bg-zinc-800"
    >
      <div className="flex flex-row items-center justify-start gap-x-4">
        <Image
          src={user.image}
          alt={user.name}
          width={50}
          height={50}
          className="aspect-square rounded-full"
        />
        <div className="flex flex-col gap-0">
          <span className="-mb-1.5 font-semibold sm:text-lg">{user.name}</span>
          <span className="mt-1 text-sm text-green-700 sm:mt-0.5">
            @{user.username}
          </span>
        </div>
      </div>
      {status === 'pending' && (
        <div className="cursor-not-allowed rounded border border-zinc-400 px-2 py-1 text-sm text-zinc-400">
          Pending
        </div>
      )}

      {status === 'toAccept' && (
        <AcceptRequestButton from={from.id} to={to.id} />
      )}

      {status === 'accepted' && (
        <RxCaretRight size={35} className="justify-self-end" />
      )}
    </Link>
  );
}
