"use client";
import React from "react";
import { signOut } from "next-auth/react";

type Props = {};

const SingOutButton = (props: Props) => {
  return (
    <button
      type="button"
      className="mt-5 text-white bg-green-700 hover:bg-green-800 transition-all focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-700 dark:hover:bg-green-800 focus:outline-none dark:focus:ring-blue-800"
      onClick={() => signOut()}
    >
      Log Out
    </button>
  );
};

export default SingOutButton;
