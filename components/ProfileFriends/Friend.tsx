import Image from 'next/image';
import Link from 'next/link';
import { RxCaretRight } from 'react-icons/rx';

import AcceptRequestButton from './AcceptRequestButton';
import DenyRequestButton from './DenyRequestButton';

import React from 'react';

export default function Friend({
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
      <div className="flex h-12 flex-row items-center justify-start gap-x-3  sm:gap-x-4 ">
        <Image
          src={user.image}
          alt={user.name}
          width={50}
          height={50}
          className="aspect-square size-11 rounded-full sm:size-12"
        />
        <div className="flex flex-col gap-0">
          <span className="-mb-1.5 text-sm font-semibold sm:text-base">
            {user.name}
          </span>
          <span className="mt-1 text-xs text-green-700 sm:mt-0.5 sm:text-sm">
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
        <div className="flex flex-row sm:gap-x-2">
          <DenyRequestButton from={from.id} to={to.id} />
          <AcceptRequestButton from={from.id} to={to.id} />
        </div>
      )}

      {status === 'accepted' && (
        <RxCaretRight size={35} className="justify-self-end" />
      )}
    </Link>
  );
}
