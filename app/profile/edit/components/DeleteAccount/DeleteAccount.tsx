import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import React from 'react';

const DeleteAccount = () => {
  const router = useRouter();
  const deleteUser = async () => {
    const result = window.confirm(
      'Are you sure you want to delete your account?'
    );

    if (result) {
      const res = await fetch('/api/user/delete');
      if (res.ok) {
        router.push('/');
        signOut();
      }
    } else {
      return;
    }
  };
  return (
    <button
      aria-label="Delete Account"
      type="button"
      className="w-1/2 mt-4 dark:text-white border border-gray-400 transition-all focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 mr-2 hover:dark:bg-gray-50/10 focus:outline-none dark:focus:ring-blue-800"
      onClick={() => deleteUser()}
    >
      Delete Account
    </button>
  );
};

export default DeleteAccount;