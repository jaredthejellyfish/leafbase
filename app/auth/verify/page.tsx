import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import protonmailLogo from '@/public/svg/protonmail-logo.svg';
import outlookLogo from '@/public/svg/outlook-logo.svg';
import gmailLogo from '@/public/svg/gmail-logo.svg';
import appleLogo from '@/public/svg/apple-logo.svg';

const AuthVerify = () => {
  return (
    <main className="flex items-center justify-center py-64 bg-zinc-50/50 dark:bg-zinc-950 px-4 sm:px-0">
      <div className="flex flex-col items-center justify-center w-full gap-3 px-8 py-10 rounded-lg shadow-lg md:w-96 dark:bg-zinc-900">
        <h1 className="mb-1 text-2xl font-medium dark:text-white">
          Check your email!
        </h1>
        <p className="text-sm text-center text-zinc-400">
          A magic link has been sent to your email so you can verify your
          account!
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
    </main>
  );
};

export default AuthVerify;
