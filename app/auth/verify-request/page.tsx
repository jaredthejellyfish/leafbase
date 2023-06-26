"use client";

import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {};

const LoginPage = (props: Props) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div
      style={{ minHeight: "calc(100vh - 145px)" }}
      className="flex items-center justify-center px-5 dark:bg-black"
    >
      <div className="flex flex-col items-center justify-center w-full gap-3 px-8 py-10 rounded-lg shadow-lg md:w-96 dark:bg-zinc-900">
        <h1 className="mb-1 text-2xl font-medium dark:text-white">
          Check your email!
        </h1>
        <p className="text-sm text-zinc-400">
          A magic link has been sent to your email so you can sign into
          Leafbase.
        </p>
        <div className="flex items-center justify-center mt-1 text-zinc-600">
          <p className="text-xs md:text-sm">────────────────────</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
