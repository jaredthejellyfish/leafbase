'use client';

import { acceptFriendship } from '@/lib/actions/friendship/acceptFriendship';

import { toast } from '../ui/use-toast';

import React from 'react';

type Props = {
  from: string;
  to: string;
};

export default function AcceptRequestButton({ from, to }: Props) {
  async function handleClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    e.stopPropagation();

    const result = await acceptFriendship(to, from);

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
        title: 'Friend request accepted',
        description: `You are now friends!`,
      });
    }
  }
  return (
    <button
      className="rounded-md bg-green-700 px-1.5 py-1 text-xs text-white transition-colors hover:bg-green-800 sm:px-2 sm:py-1.5 sm:text-sm"
      onClick={(e) => handleClick(e)}
    >
      Accept
    </button>
  );
}
