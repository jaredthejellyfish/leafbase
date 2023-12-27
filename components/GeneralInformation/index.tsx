'use client';

import type { UserMetadata } from '@supabase/supabase-js';
import { format } from 'date-fns';

import type { UserMetadataExtended } from '@/lib/database/database_types';
import { languages } from '@/lib/utils/languages';

import React from 'react';

type Props = { user: UserMetadata };

const GeneralInformation = (props: Props) => {
  const { user: plainUser } = props;
  const user = plainUser as UserMetadataExtended;

  return (
    <div className="flex w-full flex-col rounded-xl p-7 shadow-md dark:bg-zinc-900">
      <h3 className="text-xl font-bold">General information</h3>
      <>
        <span className="mt-3 text-sm dark:text-white">About me</span>
        <p className="mt-1 text-sm text-zinc-400 lg:w-4/5">
          {user?.about || 'Add a bio in the edit page.'}
        </p>
      </>
      <div
        className={`flex flex-col justify-between ${
          user?.about && 'mt-6'
        } md:w-4/5 md:flex-row`}
      >
        {user.birth_date && (
          <span className="mt-3 text-sm dark:text-white">
            Birthday:
            <p className="w-60 text-gray-400">
              {`${format(new Date(user?.birth_date), 'PP')}`}
            </p>
          </span>
        )}
        {user.language && (
          <span className="mt-3 text-sm dark:text-white">
            Language:
            <p className="w-60 text-gray-400">
              {
                languages.find((language) => language.value === user?.language)
                  ?.label
              }
            </p>
          </span>
        )}
      </div>
    </div>
  );
};

export default GeneralInformation;
