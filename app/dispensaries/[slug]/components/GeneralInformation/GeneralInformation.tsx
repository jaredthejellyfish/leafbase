'use client';

import React from 'react';

type Props = { description?: string };

const GeneralInformation = (props: Props) => {
  const { description } = props;

  return (
    description && (
      <div className="flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
        <h1 className="text-xl font-bold">Description</h1>
        <p className="mt-1 text-sm text-zinc-400 lg:w-4/5">{description}</p>
      </div>
    )
  );
};

export default GeneralInformation;
