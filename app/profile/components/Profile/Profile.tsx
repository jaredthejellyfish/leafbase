'use client';

import React from 'react';
import Image from 'next/image';
import { MdLocationPin } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { User } from '@prisma/client';
import Link from 'next/link';
import SingOutButton from '../SingOutButton/SingOutButton';

import md5 from 'md5';

type Props = { user: User };

const generateGravatarUrl = (user: User): string => {
  if (user?.image) return user.image;
  return `https://www.gravatar.com/avatar/${md5(
    user?.name || 'NaN'
  )}?d=identicon`;
};

const Profile = (props: Props) => {
  const { user } = props;

  return (
    <div className="relative z-0 flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
      <Link href="/profile/edit">
        <AiFillEdit size={20} className="absolute top-6 right-6" />
      </Link>
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

      <span className="mt-3 text-sm dark:text-white">
        Email Address:
        <p className="text-gray-400">{user?.email}</p>
      </span>
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
      <SingOutButton />
    </div>
  );
};

export default Profile;
