import { BsArrowReturnLeft } from 'react-icons/bs';
import Link from 'next/link';
import React from 'react';

import { ERRORS, DEFAULT_ERROR } from './errors';

const generateError = (error?: string) => {
  const errorObject = ERRORS.find((errorObject) => error && errorObject[error]);

  if (errorObject) {
    const errorKey = Object.keys(errorObject)[0];
    return errorObject[errorKey];
  } else {
    return DEFAULT_ERROR;
  }
};

const AuthError = (context: { searchParams: { error: string } }) => {
  const { title, body } = generateError(context.searchParams.error);
  return (
    <div
      style={{ minHeight: 'calc(100vh - 145px)' }}
      className="flex items-center justify-center px-4 dark:bg-black"
    >
      <div className="flex flex-col items-center justify-center w-full gap-3 px-8 pt-8 pb-6 rounded-lg shadow-lg md:w-96 dark:bg-zinc-900">
        <h1 className="mb-1 text-2xl font-medium dark:text-white text-center">
          {title}
        </h1>
        <p className="text-sm text-center text-zinc-400">{body}</p>
        <div className="flex flex-row gap-4"></div>
        <Link
          href="/auth/login"
          className="bg-green-700 rounded text-white p-2"
        >
          <BsArrowReturnLeft size={20} />
        </Link>
      </div>
    </div>
  );
};

export default AuthError;
