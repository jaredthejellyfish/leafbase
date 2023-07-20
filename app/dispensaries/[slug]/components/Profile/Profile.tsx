'use client';

import React from 'react';
import Image from 'next/image';
import { Dispensary } from '@prisma/client';
import { MdLocationPin } from 'react-icons/md';
import Link from 'next/link';

type Props = { dispensary: Dispensary };

const Profile = (props: Props) => {
  const { dispensary } = props;

  return (
    <div className="relative z-0 flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
      <div className="flex flex-row items-center gap-4">
        <Image
          src={dispensary?.logo || '/images/leafbase-logo.png'}
          alt="profile"
          className="p-3 bg-gray-100 rounded-md"
          width={80}
          height={80}
        />
        <div className="flex flex-col">
          <p className="mt-2 text-lg font-bold ">{dispensary?.name}</p>

          <span className="flex flex-row items-center gap-1 text-sm text-zinc-300">
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

      {dispensary?.email && (
        <span className="flex flex-col mt-3 text-sm dark:text-white">
          Phone email:
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
