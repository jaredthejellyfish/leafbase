import {
  createServerComponentClient,
  type Session,
} from '@supabase/auth-helpers-nextjs';
import { RxCaretRight } from 'react-icons/rx';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  session: Session | null;
};

export default async function Friends({ session }: Props) {
  if (!session) return null;

  const supabase = createServerComponentClient({ cookies: () => cookies() });

  const { data: friendsData } = await supabase
    .from('friends')
    .select(
      `*, to:profiles!friends_to_fkey (
      username,
      name,
      image
    )
  `
    )
    .eq('from', session.user.id)
    .is('pending', false);

  if (!friendsData || friendsData.length < 1) return null;

  const friends = friendsData?.map((friend) => friend.to);

  return (
    <div className="flex w-full flex-col rounded-xl px-7 py-3 pb-4 shadow-md dark:bg-zinc-900">
      <h3 className="mb-1.5 text-xl font-bold">Friends</h3>
      <div className="flex flex-col gap-y-2">
        {friends &&
          friends.length > 0 &&
          friends.map((friend, index) => (
            <Link
              key={index}
              href={`/profile/${friend.username}`}
              className="flex flex-row items-center justify-between rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-1.5 dark:border-zinc-700 dark:bg-zinc-800"
            >
              <div className="flex flex-row items-center justify-start gap-x-4">
                <Image
                  src={friend?.image}
                  alt={friend?.name}
                  width={50}
                  height={50}
                  className="aspect-square rounded-full"
                />
                <div className="flex flex-col gap-0">
                  <span className="-mb-1.5 font-semibold">{friend.name}</span>
                  <span className="text-green-700">@{friend.username}</span>
                </div>
              </div>
              <RxCaretRight size={35} className="justify-self-end" />
            </Link>
          ))}
      </div>
    </div>
  );
}
