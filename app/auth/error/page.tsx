import React from 'react';
import Link from 'next/link';
import { PiKeyReturnFill } from 'react-icons/pi';

const ERRORS = {
  Verification: {
    title: 'Verification Error',
    body: 'There was an error while trying to verify your email address. Please try again later.',
  },
  OAuthAccountNotLinked: {
    title: 'Account Not Linked',
    body: 'There was an error while trying to link your account. Please try again later.',
  },
  default: {
    title: 'Authentication Error',
    body: 'There was an error while trying to authenticate you. Please try again later.',
  },
};

const generateError = (error?: string) => {
  switch (error) {
    case 'Verification':
      return ERRORS.Verification;
    case 'OAuthAccountNotLinked':
      return ERRORS.OAuthAccountNotLinked;
    default:
      return ERRORS.default;
  }
};

const AuthError = (context: { searchParams: { error: string } }) => {
  const { title, body } = generateError(context.searchParams.error);
  return (
    <div
      style={{ minHeight: 'calc(100vh - 145px)' }}
      className="flex items-center justify-center px-4 dark:bg-black"
    >
      <div className="flex flex-col items-center justify-center w-full gap-3 px-8 py-10 rounded-lg shadow-lg md:w-96 dark:bg-zinc-900">
        <h1 className="mb-1 text-2xl font-medium dark:text-white text-center">
          {title}
        </h1>
        <p className="text-sm text-center text-zinc-400">{body}</p>
        <div className="flex flex-row gap-4"></div>
        <Link href="/auth/login" className="text-green-700">
          <PiKeyReturnFill size={40} />
        </Link>
      </div>
    </div>
  );
};

export default AuthError;
