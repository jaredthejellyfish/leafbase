import type { Session } from '@supabase/auth-helpers-nextjs';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Props = {
  session: Session | null;
};

function ProfileComments({ session }: Props) {
  if (!session) return null;
  return (
    <div
      className={
        'relative flex w-full flex-col rounded-xl px-7 py-3 pb-4 shadow-md dark:bg-zinc-900'
      }
    >
      <div className="mb-1.5 flex w-full flex-row items-center justify-between">
        <h3 className="text-xl font-bold">Comments</h3>
        <Link href={'/profile'}>
          <ArrowRight className="cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
        </Link>
      </div>
    </div>
  );
}

export default ProfileComments;
