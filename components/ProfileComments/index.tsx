import {
  createServerComponentClient,
  type Session,
} from '@supabase/auth-helpers-nextjs';
import { ChevronLeft } from 'lucide-react';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  session: Session | null;
};

interface StrainComment {
  id: string;
  created_at: string;
  strain_id: string;
  user_id: string;
  comment: string;
  likes_count: number;
  strain: {
    slug: string;
    nugImage: string;
    name: string;
  };
}

async function ProfileComments({ session }: Props) {
  const supabase = createServerComponentClient({ cookies: () => cookies() });
  if (!session) return null;

  const { data: commentsData } = await supabase
    .from('strain_comments')
    .select('*, strain:strain_id (slug, nugImage, name)')
    .eq('user_id', session.user.id)
    .order('likes_count', { ascending: false })
    .returns<StrainComment[]>();

  if (!commentsData) return null;

  return (
    <div
      className={
        'relative flex w-full flex-col rounded-xl px-7 py-3 pb-4 shadow-md dark:bg-zinc-900'
      }
    >
      <div className="mb-1.5 flex w-full flex-row items-center justify-between">
        <h3 className="text-xl font-bold">Top Comments</h3>
        <Link href={'/profile'} scroll={false}>
          <ChevronLeft className="cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
        </Link>
      </div>
      <div className="flex flex-col gap-y-2.5">
        {commentsData.map((comment, index) => {
          if (index > 2) return null;
          return (
            <Link
              key={index}
              href={`/strains/${comment.strain.slug}#${comment.id}`} // <- /strain
              className="flex flex-row items-center justify-between rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-1.5 dark:border-zinc-700 dark:bg-zinc-800"
            >
              <div className="flex flex-row items-center justify-start gap-x-2.5 sm:gap-x-4">
                <Image
                  src={comment.strain.nugImage}
                  alt={comment.strain.name}
                  width={50}
                  height={50}
                  className="aspect-square h-[47px] w-[47px] sm:h-12 sm:w-12"
                />
                <div className="flex flex-col gap-0">
                  <span className="-mb-1.5 text-sm font-semibold sm:text-base">
                    {comment.strain.name}
                  </span>
                  <span className="mt-1 text-xs text-zinc-400 sm:mt-0.5 sm:text-sm">
                    {comment.comment}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ProfileComments;
