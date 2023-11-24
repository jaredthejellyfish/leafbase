import React from 'react';

import { signOutUser } from '@/lib/actions/auth/signOutUser';
import SubmitButton from '../SubmitButton';

const SignoutButton = () => {
  return (
    <form className="flex w-full justify-center px-0" action={signOutUser}>
      <SubmitButton
        text={'Sign out'}
        whilePending={'Signing out...'}
        ariaLabel="Sign out"
        className="mb-2 mr-2 mt-5 w-full rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-blue-800"
      />
    </form>
  );
};

export default SignoutButton;
