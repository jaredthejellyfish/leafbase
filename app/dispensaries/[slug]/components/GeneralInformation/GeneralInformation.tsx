'use client;';
import { Dispensary } from '@prisma/client';
import React from 'react';

type Props = { dispensary: Dispensary };

const GeneralInformation = (props: Props) => {
  const { dispensary } = props;

  return (
    <div className="flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
      <h1 className="text-xl font-bold">Description</h1>
      {dispensary?.description && (
        <p className="mt-1 text-sm text-zinc-400 lg:w-4/5">
          {dispensary?.description}
        </p>
      )}
    </div>
  );
};

export default GeneralInformation;
