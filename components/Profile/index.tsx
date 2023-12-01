'use client';

import type { Session, UserMetadata } from '@supabase/supabase-js';
import { BsFillGearFill } from 'react-icons/bs';
import { MdLocationPin } from 'react-icons/md';
import { AiFillEye } from 'react-icons/ai';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type {
  PublicProfile,
  UserMetadataExtended,
} from '@/lib/database/database_types';
import FriendRequestButton from '../FriendRequestButton';
import SignoutButton from './SignoutButton';
import { cn } from '@/lib/utils';

type Props = {
  user: UserMetadata;
  session?: Session | null;
  hideOptions?: boolean;
  allowFriendRequest?: boolean;
  pendingFriendRequest?: boolean;
  isFriends?: boolean;
} & (
  | { allowFriendRequest: true; user: PublicProfile }
  | { allowFriendRequest?: false; user: UserMetadataExtended }
);

const Profile = (props: Props) => {
  const { user: plainUser, session } = props;
  const user = plainUser as UserMetadataExtended;

  return (
    <div className="relative z-0 flex w-full flex-col rounded-xl p-7 shadow-md dark:bg-zinc-900">
      <div className="absolute right-8 top-6 flex items-center justify-center gap-6 ">
        {!props.hideOptions && (
          <>
            {user.username && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center justify-center">
                    <Link
                      id="view-profile"
                      className="text-zinc-500 dark:text-zinc-300"
                      href={`/profile/${user.username}`}
                    >
                      <AiFillEye size={20} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold">View profile</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center justify-center">
                  <Link
                    id="edit-profile"
                    className="text-zinc-500 dark:text-zinc-300"
                    href="/profile/edit"
                  >
                    <BsFillGearFill size={18} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-semibold">Edit profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
        {props.allowFriendRequest && (
          <FriendRequestButton
            user={user as PublicProfile}
            pending={props.pendingFriendRequest}
            friends={props.isFriends}
          />
        )}
      </div>
      {user.image && (
        <Image
          src={user.image}
          alt="profile"
          priority
          unoptimized
          className="rounded-md"
          width={80}
          height={80}
        />
      )}
      <p className={cn('mt-2 text-lg font-bold', !user?.name ? 'mt-0' : '')}>
        {user?.name}
      </p>
      {user?.username ? (
        <>
          <span className="flex flex-row items-center gap-1 text-sm text-zinc-300">
            <span className="text-zinc-400">{user?.username}</span>
          </span>
          {user?.location && (
            <span className="mt-3 text-sm dark:text-white">
              Location:
              <span className="flex flex-row items-center gap-1 text-sm text-zinc-300">
                <MdLocationPin />
                <span className="text-zinc-400">{user?.location}</span>
              </span>
            </span>
          )}
        </>
      ) : (
        <span className="flex flex-row items-center gap-1 text-sm text-zinc-300">
          <MdLocationPin />
          <span className="text-zinc-400">{user?.location}</span>
        </span>
      )}

      {session && session?.user.email && (
        <span className="mt-3 text-sm dark:text-white">
          Email Address:
          <p className="text-gray-400">{session?.user.email}</p>
        </span>
      )}
      {user.phone && (
        <span className="mt-3 flex flex-col text-sm dark:text-white">
          Phone number:
          <span className="text-gray-400">{user.phone}</span>
        </span>
      )}
      {!props.hideOptions && <SignoutButton />}
    </div>
  );
};

export default Profile;
