'use client';

import { User } from '@prisma/client';
import React from 'react';
import { format } from 'date-fns';

type Props = {
  user: User;
};

const GeneralInformation = (props: Props) => {
  const { user } = props;

  return (
    <>
      <h1 className="text-xl font-bold">General information</h1>
      {user?.aboutMe && (
        <>
          <h2 className="mt-4 text-lg">About me</h2>
          <p className="mt-1 text-sm text-zinc-400 lg:w-4/5">{user?.aboutMe}</p>
        </>
      )}
      <div
        className={`flex flex-col justify-between ${
          user?.aboutMe && 'mt-6'
        } md:flex-row md:w-4/5`}
      >
        <span className="mt-3 text-sm dark:text-white">
          Birthday:
          <p className="text-gray-400 w-60">
            {`${user.birthDate && format(new Date(user?.birthDate), 'PP')}`}
          </p>
        </span>
        <span className="mt-3 text-sm dark:text-white">
          Languages:
          <p className="text-gray-400 w-60">{user?.languages}</p>
        </span>
      </div>
    </>
  );
};

export default GeneralInformation;