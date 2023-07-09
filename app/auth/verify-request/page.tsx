'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import gmailLogo from '@/public/gmail-logo.svg';
import protonmailLogo from '@/public/protonmail-logo.svg';
import outlookLogo from '@/public/outlook-logo.svg';
import appleLogo from '@/public/apple-logo.svg';

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      //router.push("/");
    }
  }, [status, router]);

  return (
    <div
      style={{ minHeight: 'calc(100vh - 145px)' }}
      className="flex items-center justify-center px-5 dark:bg-black"
    >
      <div className="flex flex-col items-center justify-center w-full gap-3 px-8 py-10 rounded-lg shadow-lg md:w-96 dark:bg-zinc-900">
        <h1 className="mb-1 text-2xl font-medium dark:text-white">
          Check your email!
        </h1>
        <p className="text-sm text-center text-zinc-400">
          A magic link has been sent to your email so you can sign into
          Leafbase.
        </p>
        <div className="flex items-center justify-center text-zinc-300 dark:text-zinc-600">
          <p className="text-xs md:text-sm">────────────────────</p>
        </div>
        <div className="flex flex-row gap-4">
          <Link
            href="https://gmail.com"
            className="flex items-center justify-center w-12 h-12 text-red-600 transition bg-white border rounded shadow-md dark:bg-zinc-100 hover:scale-105 border-zinc-100"
          >
            <Image height={34} width={34} src={gmailLogo} alt="gmail logo" />
          </Link>
          <Link
            href="https://protonmail.com"
            className="flex items-center justify-center w-12 h-12 text-red-600 transition bg-white border rounded shadow-md dark:bg-zinc-100 hover:scale-105 border-zinc-100"
          >
            <Image
              height={34}
              width={34}
              src={protonmailLogo}
              alt="Protonmail logo"
            />
          </Link>
          <Link
            href="https://gmail.com"
            className="flex items-center justify-center w-12 h-12 text-red-600 transition bg-white border rounded shadow-md dark:bg-zinc-100 hover:scale-105 border-zinc-100"
          >
            <Image
              height={34}
              width={34}
              src={outlookLogo}
              alt="Outlook logo"
            />
          </Link>
          <Link
            href="https://icloud.com"
            className="flex items-center justify-center w-12 h-12 text-red-600 transition bg-white border rounded shadow-md dark:bg-zinc-100 hover:scale-105 border-zinc-100"
          >
            <Image height={34} width={34} src={appleLogo} alt="Apple logo" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
