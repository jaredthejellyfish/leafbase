"use client";

import React from "react";
import { MdError } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserProfileError = () => {
  const router = useRouter();
  return (
    <div className="absolute top-0 flex flex-col items-center justify-center w-screen h-screen">
      <MdError size={80} className="text-green-700" />
      <h1 className="mt-5 text-3xl font-semibold text-gray-700 dark:text-gray-400">
        Oops, something went wrong.
      </h1>
      <p className="mt-5 text-lg text-gray-700 dark:text-gray-400">
        We couldn&apos;t load the requested content.
      </p>
      <button
        onClick={() => router.back()}
        className="mt-5 text-lg font-medium text-green-700 hover:text-green-800 dark:text-green-700 dark:hover:text-green-600"
      >
        Return to Home
      </button>
    </div>
  );
};

export default UserProfileError;
