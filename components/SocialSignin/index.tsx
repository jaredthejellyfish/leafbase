'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Provider } from '@supabase/supabase-js';
import Image from 'next/image';
import React from 'react';

import google from '@/public/provider-logos/google.png';
import github from '@/public/provider-logos/github.png';
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
    await supabase.auth.signInWithOAuth({
      provider,
    });
  }

  return (
    <div className="flex justify-center space-x-4">
      <Button
        className="flex aspect-square w-14 h-14 items-center justify-center border border-zinc-400 text-white dark:border-zinc-600 dark:bg-zinc-700"
        variant="outline"
        onClick={(e) => signInWithProvider(e, 'google')}
      >
        <Image
          src={google}
          alt={'Google logo'}
          width={40}
          height={40}
          priority={true}
        />
      </Button>
      <Button
        className="flex h-14 w-14 items-center justify-center border border-zinc-400 text-white dark:border-zinc-600 dark:bg-zinc-700"
        variant="outline"
        onClick={(e) => signInWithProvider(e, 'github')}
      >
        <Image
          className={'dark:invert'}
          src={github}
          alt={'Github logo'}
          width={40}
          height={40}
          priority={true}
        />
      </Button>
      <Button
        className="flex h-14 w-14 items-center justify-center border border-zinc-400 text-white dark:border-zinc-600 dark:bg-zinc-700"
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
        className="flex h-14 w-14 items-center justify-center border border-zinc-400 text-white dark:border-zinc-600 dark:bg-zinc-700"
        variant="outline"
        onClick={(e) => signInWithProvider(e, 'discord')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 127.14 96.36"
          style={{ fill: '#7289DA' }}
        >
          <g id="Discord_Logos" data-name="Discord Logos">
            <g
              id="Discord_Logo_-_Large_-_White"
              data-name="Discord Logo - Large - White"
            >
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
            </g>
          </g>
        </svg>
      </Button>
    </div>
  );
}

export default SocialSignin;
