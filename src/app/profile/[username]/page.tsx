import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import NavBreadcrumbs from '@c/NavBreadcrumbs';

import { cn } from '@u/cn';
import getServerLikesByUserID from '@u/getServerLikesByUserID';
import getServerUserProfileByUsername from '@u/getServerUserProfileByUsername';

import type { Database } from '@l/database';

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
] as const;

const LikedStrains = dynamic(() => import('@c/LikedStrains'), { ssr: true });

type Props = { params: { username: string } };

async function ProfilePage({ params: { username } }: Props) {
  const cookieStore = cookies();

  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const { user, error } = await getServerUserProfileByUsername(
    supabase,
    username,
  );
  const { likes } = await getServerLikesByUserID(supabase, user?.id);

  if (!user || error) {
    return notFound();
  }
  return (
    <div className="px-5 py-3 sm:px-10 xl:px-14">
      <NavBreadcrumbs
        urls={[
          { name: 'Profile', url: '/profile' },
          { name: username, url: `/profile/${username}` },
        ]}
      />
      <div className={'flex flex-col gap-x-4 gap-y-3 sm:flex-row'}>
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <div className="relative z-0 flex w-full flex-col rounded-xl px-7 pt-6 shadow-md dark:bg-zinc-900">
            {user.image && (
              <Image
                src={user.image}
                alt="profile"
                className="rounded-md aspect-square object-cover"
                width={80}
                height={80}
              />
            )}
            <span
              className={cn(
                'mt-2 text-lg font-bold',
                !user?.name ? 'mt-0' : '',
              )}
            >
              {user?.name}
              {user?.pronouns && (
                <span className="ml-1.5 text-sm text-zinc-400">
                  ({user?.pronouns})
                </span>
              )}
            </span>
            {user?.username ? (
              <>
                <span className="flex flex-row items-center gap-1 text-sm text-zinc-300">
                  <span className="text-zinc-400">@{user?.username}</span>
                </span>
                {user?.location && (
                  <span className="mb-6 mt-3 text-sm dark:text-white">
                    Location:
                    <span className="flex flex-row items-center gap-1 text-sm text-zinc-300">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        height="15px"
                        width="15px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 1.74.5 3.37 1.41 4.84.95 1.54 2.2 2.86 3.16 4.4.47.75.81 1.45 1.17 2.26.26.55.47 1.5 1.26 1.5s1-.95 1.25-1.5c.37-.81.7-1.51 1.17-2.26.96-1.53 2.21-2.85 3.16-4.4C18.5 12.37 19 10.74 19 9c0-3.87-3.13-7-7-7zm0 9.75a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"></path>
                      </svg>
                      <span className="text-zinc-400">{user?.location}</span>
                    </span>
                  </span>
                )}
              </>
            ) : (
              user?.location && (
                <span className="mb-6 mt-2 text-sm dark:text-white">
                  Location:
                  <span className="flex flex-row items-center gap-1 text-sm text-zinc-300">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="15px"
                      width="15px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 1.74.5 3.37 1.41 4.84.95 1.54 2.2 2.86 3.16 4.4.47.75.81 1.45 1.17 2.26.26.55.47 1.5 1.26 1.5s1-.95 1.25-1.5c.37-.81.7-1.51 1.17-2.26.96-1.53 2.21-2.85 3.16-4.4C18.5 12.37 19 10.74 19 9c0-3.87-3.13-7-7-7zm0 9.75a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"></path>
                    </svg>
                    <span className="text-zinc-400">{user?.location}</span>
                  </span>
                </span>
              )
            )}
          </div>
        </div>
        <div className="w-full sm:w-1/2 lg:w-2/3">
          <div className="flex w-full flex-col rounded-xl p-7 shadow-md dark:bg-zinc-900">
            <h3 className="text-xl font-bold">General information</h3>
            <>
              <span className="mt-3 text-sm dark:text-white">About me</span>
              <p className="mt-1 text-sm text-zinc-400 lg:w-4/5">
                {user?.about ?? 'Add a bio in the edit page.'}
              </p>
            </>
            <div
              className={`flex flex-col justify-between ${
                user?.about && 'mt-6'
              } md:w-4/5 md:flex-row`}
            >
              {user.birth_date && (
                <span className="mt-3 text-sm dark:text-white">
                  Birthday:
                  <p className="w-60 text-gray-400">
                    {`${format(new Date(user?.birth_date), 'PP')}`}
                  </p>
                </span>
              )}
              {user.language && (
                <span className="mt-3 text-sm dark:text-white">
                  Language:
                  <p className="w-60 text-gray-400">
                    {
                      languages.find(
                        (language) => language.value === user?.language,
                      )?.label
                    }
                  </p>
                </span>
              )}
            </div>
          </div>
          {likes && likes.length > 0 && (
            <LikedStrains likes={likes ?? undefined} noModals />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
