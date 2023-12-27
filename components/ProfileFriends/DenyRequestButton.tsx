'use client';

import { denyFriendship } from '@/lib/actions/friendship/denyFriendship';

import { toast } from '../ui/use-toast';

import React from 'react';

type Props = {
  from: string;
  to: string;
};

export default function DenyRequestButton({ from, to }: Props) {
  async function handleClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    e.stopPropagation();

    const result = await denyFriendship(to, from);

    if (result.error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: result.error,
      });
      return;
    }
    if (result.accepted) {
      toast({
        title: 'Friend request denied',
        description: `The friend request has been denied.`,
      });
    }
  }
  return (
    <button
      className="mr-1 block rounded-md border border-zinc-500 bg-transparent px-1.5 py-1 text-xs text-zinc-700 transition-colors hover:bg-zinc-700 hover:text-white dark:text-zinc-300 hover:dark:bg-zinc-300/80 hover:dark:text-zinc-800 sm:mr-0 sm:px-2 sm:py-1.5 sm:text-sm lg:hidden xl:block"
      onClick={(e) => handleClick(e)}
    >
      Deny
    </button>
  );
}
