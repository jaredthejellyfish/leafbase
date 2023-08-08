'use client';

import { BsFillGearFill } from 'react-icons/bs';
import { MdLocationPin } from 'react-icons/md';
import { AiFillEye } from 'react-icons/ai';
import { User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import generateGravatarUrl from '@/utils/generateGravatarUrl';
import SingOutButton from '../SingOutButton/SingOutButton';

type Props = { user: User };

const Profile = (props: Props) => {
  const { user } = props;

  return (
    <div className="relative z-0 flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
      <div className="absolute flex items-center justify-center gap-6 top-6 right-8 ">
        {user.displayName && (
          <Link
            className="text-zinc-500 dark:text-zinc-300"
            href={`/profile/${user.displayName}`}
          >
            <AiFillEye size={20} />
          </Link>
        )}
        <Link className="text-zinc-500 dark:text-zinc-300" href="/profile/edit">
          <BsFillGearFill size={18} />
        </Link>
      </div>
      <Image
        src={generateGravatarUrl(user as User)}
        alt="profile"
        className="rounded-md"
        width={80}
        height={80}
      />
      <p className="mt-2 text-lg font-bold ">{user?.name}</p>
      {user?.displayName ? (
        <>
          <span className="flex flex-row items-center gap-1 text-sm text-zinc-300">
            <span className="text-zinc-400">{user?.displayName}</span>
          </span>
          <span className="mt-3 text-sm dark:text-white">
            Location:
            <span className="flex flex-row items-center gap-1 text-sm text-zinc-300">
              <MdLocationPin />
              <span className="text-zinc-400">{user?.location}</span>
            </span>
          </span>
        </>
      ) : (
        <span className="flex flex-row items-center gap-1 text-sm text-zinc-300">
          <MdLocationPin />
          <span className="text-zinc-400">{user?.location}</span>
        </span>
      )}

      {user.email && (
        <span className="mt-3 text-sm dark:text-white">
          Email Address:
          <p className="text-gray-400">{user?.email}</p>
        </span>
      )}
      {user.phone && (
        <span className="flex flex-col mt-3 text-sm dark:text-white">
          Phone number:
          <span className="text-gray-400">
            {user?.phone &&
              import('react-phone-number-input').then(
                ({ formatPhoneNumberIntl }) =>
                  formatPhoneNumberIntl(user?.phone as string)
              )}
          </span>
        </span>
      )}
      <SingOutButton />
    </div>
  );
};

export default Profile;
