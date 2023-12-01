'use client';

import { FaUserFriends } from 'react-icons/fa';
import React, { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { manageFriendship } from '@/lib/actions/friendship/manageFriendship';
import type { PublicProfile } from '@/lib/database/database_types';
import { toast } from '../ui/use-toast';
import { cn } from '@/lib/utils';

type Props = {
  user: PublicProfile;
  pending?: boolean;
  friends?: boolean;
};

function FriendRequestButton({ user, pending, friends }: Props) {
  const [isPending, setIsPending] = useState(pending || false);
  const [isFriends, setIsFriends] = useState(friends || false);

  const to = user.id;

  const removeFriend = async () => {
    const result = (await manageFriendship(to, user.username)) as {
      error: string | null;
      created: boolean;
      deleted: boolean;
    };

    if (result.error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: result.error,
      });
      return;
    }

    if (result.deleted) {
      setIsFriends(false);
      setIsPending(false);

      toast({
        title: 'Friend removed',
        description: `You removed ${user.username} from your friends`,
      });
    }
  };

  const handleClick = async () => {
    if (isFriends) {
      return;
    }

    const result = (await manageFriendship(to, user.username)) as {
      error: string | null;
      created: boolean;
      deleted: boolean;
    };

    if (result.error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: result.error,
      });
      return;
    }

    if (result.created) {
      setIsPending(true);
      setIsFriends(false);

      toast({
        title: 'Friend request sent',
        description: `You sent a friend request to ${user.username}`,
      });
      return;
    }

    if (isPending === true && result.deleted) {
      setIsPending(false);
      setIsFriends(false);

      toast({
        title: 'Friend request canceled',
        variant: 'destructive',
        description: `You canceled your friend request to ${user.username}`,
      });
      return;
    }
  };

  return !isFriends ? (
    <button
      className={cn(
        'border border-zinc-500 p-2 rounded-full text-zinc-500',
        isPending ? 'border-zinc-300 text-zinc-300' : null,
        isFriends ? 'text-green-700 border-green-700 bg-zinc-800' : null
      )}
      onClick={handleClick}
    >
      <FaUserFriends className="h-5 w-5" />
    </button>
  ) : (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(
          'border border-zinc-500 p-1.5 rounded-full text-zinc-500 hover:text-green-700 aspect-square',
          isPending ? 'border-zinc-300 text-zinc-300' : null,
          isFriends ? 'text-green-700 border-green-700 bg-zinc-800' : null
        )}
      >
        <FaUserFriends className="h-5 w-5" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove{' '}
            <span className="text-green-700">@{user.username}</span> from your
            friends.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <p>Cancel</p>
          </AlertDialogCancel>
          <AlertDialogAction>
            <div onClick={removeFriend}>Remove friend</div>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default FriendRequestButton;
