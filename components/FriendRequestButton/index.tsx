'use client';

import { FaUserFriends } from 'react-icons/fa';

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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { manageFriendship } from '@/lib/actions/friendship/manageFriendship';
import { cn } from '@/lib/utils';

import { toast } from '../ui/use-toast';

import React, { useState } from 'react';

type Props = {
  from: string;
  to: string;
  pending: boolean;
  username: string;
  exists: boolean;
};

function FriendRequestButton({ from, to, username, pending, exists }: Props) {
  const [isPending, setIsPending] = useState(exists && pending === true);
  const [isFriends, setIsFriends] = useState(exists && pending === false);

  const removeFriend = async () => {
    const result = (await manageFriendship(to, from, username)) as {
      error: string | null;
      created: boolean;
      deleted: boolean;
    };

    if (!result) {
      return;
    }

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
        description: `You removed ${username} from your friends`,
      });
    }
  };

  const handleClick = async () => {
    if (isFriends) {
      return;
    }

    const result = (await manageFriendship(to, from, username)) as {
      error: string | null;
      created: boolean;
      deleted: boolean;
    };

    if (!result) {
      return;
    }

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
        description: `You sent a friend request to ${username}`,
      });
      return;
    }

    if (isPending === true && result.deleted) {
      setIsPending(false);
      setIsFriends(false);

      toast({
        title: 'Friend request canceled',
        variant: 'destructive',
        description: `You canceled your friend request to ${username}`,
      });
      return;
    }
  };

  return !isFriends ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="flex items-center justify-center">
          <div
            className={cn(
              'rounded-full border border-zinc-600 p-2 text-zinc-600',
              isPending
                ? 'border-zinc-400 text-zinc-400  dark:border-zinc-300 dark:text-zinc-300 '
                : null,
              isFriends
                ? 'border-green-600 text-green-600 dark:bg-zinc-800'
                : null,
            )}
            onClick={handleClick}
          >
            <FaUserFriends className="h-5 w-5" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-semibold">
            {isPending
              ? 'Cancel pending friend request'
              : 'Send a friend request'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center justify-center border-transparent bg-transparent p-0 hover:bg-transparent">
        <div
          className={cn(
            'hover:scale-101 aspect-square rounded-full border border-zinc-600 p-2 text-zinc-600 hover:text-green-600',
            'border-green-600 text-green-600 dark:bg-zinc-800',
          )}
        >
          <FaUserFriends className="h-5 w-5" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove{' '}
            <span className="text-green-600">@{username}</span> from your
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
