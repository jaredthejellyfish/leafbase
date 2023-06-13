"use client";
import React from "react";
import { signOut } from "next-auth/react";

type Props = {};

const SingOutButton = (props: Props) => {
  return (
    <button
      type="button"
      className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      onClick={() => signOut()}
    >
      Log Out
    </button>
  );
};

export default SingOutButton;
