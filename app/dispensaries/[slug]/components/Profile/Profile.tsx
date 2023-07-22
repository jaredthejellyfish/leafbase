'use client';

import React from 'react';
import Image from 'next/image';
import { Dispensary } from '@prisma/client';
import { MdLocationPin } from 'react-icons/md';
import Link from 'next/link';
import StarRating from '@/components/StarRating/StarRating';
import md5 from 'md5';

type Props = { dispensary: Dispensary };

const Profile = (props: Props) => {
  const { dispensary } = props;

  return (
    <div className="relative z-0 flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
      <div className="flex flex-row items-center gap-4">
        <Image
          src={
            dispensary?.logo ||
            `https://www.gravatar.com/avatar/${md5(
              dispensary?.name || 'NaN'
            )}?d=identicon`
          }
          alt="profile"
          className="bg-white rounded-md"
          width={80}
          height={80}
        />
        <div className="flex flex-col">
          <p className="text-lg font-bold ">{dispensary?.name}</p>
          <span className="flex items-center justify-start gap-3 -mt-1 text-sm text-zinc-800 dark:text-zinc-200">
            {dispensary.averageRating &&
              Math.round(dispensary.averageRating * 10) / 10}
            <StarRating rating={dispensary.averageRating || 0} />
          </span>
          <span className="flex-row items-center hidden gap-1 text-sm md:flex text-zinc-300">
            <MdLocationPin />
            <Link
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                dispensary?.address || 'Unknown'
              )}`}
              className="overflow-hidden text-zinc-400 hover:text-green-400 overflow-ellipsis"
            >
              {dispensary?.address}, {dispensary?.city}
            </Link>
          </span>
        </div>
      </div>

      <span className="flex flex-col mt-3 text-sm sm:hidden dark:text-white">
        Location:
        <span className="flex flex-row items-center gap-1 text-sm text-zinc-300">
          <MdLocationPin />
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              dispensary?.address || 'Unknown'
            )}`}
            className="text-zinc-400 hover:text-green-400"
          >
            <div id="span-thing" className="truncate">
              {`${dispensary?.address}, ${dispensary?.city}`}
            </div>
          </Link>
        </span>
      </span>

      {dispensary?.email && (
        <span className="flex flex-col mt-3 text-sm dark:text-white">
          Email:
          <span className="text-gray-400 hover:text-green-400">
            <Link href={`mailto:${dispensary?.email}`}>{dispensary.email}</Link>
          </span>
        </span>
      )}
      {dispensary?.phone && (
        <span className="flex flex-col mt-3 text-sm dark:text-white ">
          Phone number:
          <Link
            className="text-gray-400 hover:text-green-400"
            href={`tel:${dispensary.phone}`}
          >
            {dispensary?.phone &&
              import('react-phone-number-input').then(
                ({ formatPhoneNumberIntl }) =>
                  formatPhoneNumberIntl(dispensary.phone as string)
              )}
          </Link>
        </span>
      )}
    </div>
  );
};

export default Profile;
