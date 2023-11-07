'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Provider } from '@supabase/supabase-js';
import dynamic from 'next/dynamic';
import React from 'react';

import { Button } from '@/components/ui/button';
import type { Database } from '@/lib/database';

function SocialSignin() {
  const supabase = createClientComponentClient<Database>();

  async function signInWithProvider(
    e: React.MouseEvent<HTMLButtonElement>,
    provider: Provider
  ) {
    e.preventDefault();
    e.stopPropagation();
    console.log('signing in with github');
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
    });

    console.log(data, error);
  }

  return (
    <div className="flex justify-center space-x-4">
      <Button
        className="w-14 h-14 flex items-center justify-center dark:bg-zinc-700 border border-zinc-400 dark:border-zinc-600 text-white"
        variant="outline"
        onClick={(e) => signInWithProvider(e, 'google')}
      >
        <svg
          className=" h-5 w-5 text-red-600"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
          <line x1="21.17" x2="12" y1="8" y2="8" />
          <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
          <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
        </svg>
      </Button>
      <Button
        className="w-14 h-14 flex items-center justify-center dark:bg-zinc-700 border border-zinc-400 dark:border-zinc-600 text-white"
        variant="outline"
        onClick={(e) => signInWithProvider(e, 'github')}
      >
        <svg
          className="h-5 w-5 dark:text-white text-black"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      </Button>
      <Button
        className="w-14 h-14 flex items-center justify-center dark:bg-zinc-700 border border-zinc-400 dark:border-zinc-600 text-white"
        variant="outline"
        onClick={(e) => signInWithProvider(e, 'twitch')}
      >
        <svg
          className=" h-5 w-5 text-purple-500"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7" />
        </svg>
      </Button>
      <Button
        className="w-14 h-14 flex items-center justify-center dark:bg-zinc-700 border border-zinc-400 dark:border-zinc-600 text-white"
        variant="outline"
        onClick={(e) => signInWithProvider(e, 'discord')}
      >
        <svg
          className=" h-5 w-5 text-blue-500"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      </Button>
    </div>
  );
}

export default dynamic(() => Promise.resolve(SocialSignin), { ssr: true });
