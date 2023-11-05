import React from 'react';

import { signOutUser } from '@/lib/actions/signOutUser';
import SubmitButton from '../SubmitButton';

const SignoutButton = () => {
  return (
    <form className="w-full flex justify-center px-0" action={signOutUser}>
      <SubmitButton
        text={'Sign out'}
        whilePending={'Signing out...'}
        className="w-full mt-5 text-white bg-green-700 hover:bg-green-800 transition-all focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-700 dark:hover:bg-green-800 focus:outline-none dark:focus:ring-blue-800"
      />
    </form>
  );
};

export default SignoutButton;
