'use client';

import React from 'react';

import { acceptFriendship } from '@/lib/actions/friendship/acceptFriendship';
import { toast } from '../ui/use-toast';

type Props = {
  from: string;
  to: string;
};

export default function AcceptRequestButton({ from, to }: Props) {
  async function handleClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
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
      className="rounded-md bg-green-700 px-2 py-1.5 text-sm text-white"
      onClick={(e) => handleClick(e)}
    >
      Accept
    </button>
  );
}
