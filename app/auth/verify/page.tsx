import Image from 'next/image';
import Link from 'next/link';

import appleLogo from '@/public/svg/apple-logo.svg';
import gmailLogo from '@/public/svg/gmail-logo.svg';
import outlookLogo from '@/public/svg/outlook-logo.svg';
import protonmailLogo from '@/public/svg/protonmail-logo.svg';

import React from 'react';

const AuthVerify = () => {
  return (
    <main className="flex items-center justify-center bg-zinc-50/50 px-4 py-64 dark:bg-zinc-950 sm:px-0">
      <div className="flex w-full flex-col items-center justify-center gap-3 rounded-lg px-8 py-10 shadow-lg dark:bg-zinc-900 md:w-96">
        <h1 className="mb-1 text-2xl font-medium dark:text-white">
          Check your email!
        </h1>
        <p className="text-center text-sm text-zinc-400">
          A magic link has been sent to your email so you can verify your
          account!
        </p>
        <div className="flex items-center justify-center text-zinc-300 dark:text-zinc-600">
          <p className="text-xs md:text-sm">────────────────────</p>
        </div>
        <div className="flex flex-row gap-4">
          <Link
            href="https://gmail.com"
            className="flex h-12 w-12 items-center justify-center rounded border border-zinc-100 bg-white text-red-600 shadow-md transition hover:scale-105 dark:bg-zinc-100"
          >
            <Image height={34} width={34} src={gmailLogo} alt="gmail logo" />
          </Link>
          <Link
            href="https://protonmail.com"
            className="flex h-12 w-12 items-center justify-center rounded border border-zinc-100 bg-white text-red-600 shadow-md transition hover:scale-105 dark:bg-zinc-100"
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
            className="flex h-12 w-12 items-center justify-center rounded border border-zinc-100 bg-white text-red-600 shadow-md transition hover:scale-105 dark:bg-zinc-100"
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
            className="flex h-12 w-12 items-center justify-center rounded border border-zinc-100 bg-white text-red-600 shadow-md transition hover:scale-105 dark:bg-zinc-100"
          >
            <Image height={34} width={34} src={appleLogo} alt="Apple logo" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AuthVerify;
