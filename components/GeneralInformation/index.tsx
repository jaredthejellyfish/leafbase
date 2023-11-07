'use client';

import type { UserMetadata } from '@supabase/supabase-js';
import React from 'react';

import type { UserMetadataExtended } from '@/lib/database/database_types';
import { format } from 'date-fns';

type Props = { user: UserMetadata };

const GeneralInformation = (props: Props) => {
  const { user: plainUser } = props;
  const user = plainUser as UserMetadataExtended;

  return (
    <div className="flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
      <h1 className="text-xl font-bold">General information</h1>
        <>
          <span className="mt-3 text-sm dark:text-white">About me</span>
          <p className="mt-1 text-sm text-zinc-400 lg:w-4/5">{user?.aboutMe || "Add a bio in the edit page."}</p>
        </>
      <div
        className={`flex flex-col justify-between ${
          user?.aboutMe && 'mt-6'
        } md:flex-row md:w-4/5`}
      >
        {user.birthDate && (
          <span className="mt-3 text-sm dark:text-white">
            Birthday:
            <p className="text-gray-400 w-60">
              {`${format(new Date(user?.birthDate), 'PP')}`}
            </p>
          </span>
        )}
        {user.languages && (
          <span className="mt-3 text-sm dark:text-white">
            Languages:
            <p className="text-gray-400 w-60">{user?.languages}</p>
          </span>
        )}
      </div>
    </div>
  );
};

export default GeneralInformation;
