'use client';

import type { Session } from '@supabase/auth-helpers-nextjs';
import { FullscreenIcon } from 'lucide-react';

import type { FriendExtended } from '@/lib/database/database_types';

import Modal from '../Modal';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import Friend from './Friend';

import React from 'react';

type Props = {
  friends: FriendExtended[];
  session: Session;
};

function FullScreenButton({ friends, session }: Props) {
  const [open, setOpen] = React.useState(false);
  if (friends.length < 4) return null;
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FullscreenIcon
              onClick={() => setOpen(!open)}
              className="h-5 w-6 text-zinc-600 dark:text-zinc-300"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-semibold">All friends</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Modal open={open} setOpen={setOpen} title="Friends">
        <div className="flex flex-col gap-y-2">
          {friends &&
            friends.length > 0 &&
            friends.map((friend, index) => {
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
      </Modal>
    </>
  );
}

export default FullScreenButton;
