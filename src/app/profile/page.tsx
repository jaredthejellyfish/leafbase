import type { Session } from "@supabase/supabase-js";
import { format } from "date-fns";

import Friend from "@c/Friend";
import NavBreadcrumbs from "@c/NavBreadcrumbs";

import { cn } from "@/lib/utils/cn";

import type { FriendExtended, Profile, StrainLike } from "@/lib/types";

import Image from "next/image";
import getServerUserProfile from "@/lib/utils/getServerUserProfile";
import { notFound } from "next/navigation";
import { getServerFriends } from "@/lib/utils/getServerFriends";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database";
import getServerLikes from "@/lib/utils/getServerLikes";
import LikedStrain from "@c/LikedStrain";

type Props = {
  user: Profile;
  session: Session;
  friends: FriendExtended[] | null;
  likes: StrainLike[] | null;
};

export const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;



async function ProfilePage({}: Props) {
  const cookieStore = cookies();

  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const { user, session, error } = await getServerUserProfile(supabase);
  const { friends } = await getServerFriends(supabase, session);
  const { likes } = await getServerLikes(supabase, session);

  if (!user || error) {
    return notFound();
  }
  return (
    <div className="px-5 py-3 sm:px-10 xl:px-14">
      <NavBreadcrumbs urls={[{ name: "Profile", url: "/profile" }]} />
      <div className={"flex flex-col gap-x-4 gap-y-3 sm:flex-row"}>
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <div className="relative z-0 flex w-full flex-col rounded-xl px-7 pt-6 shadow-md dark:bg-zinc-900">
            {user.image && (
              <Image
                src={user.image}
                alt="profile"
                className="rounded-md"
                width={80}
                height={80}
              />
            )}
            <span
              className={cn(
                "mt-2 text-lg font-bold",
                !user?.name ? "mt-0" : "",
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
                  <span className="mt-3 text-sm dark:text-white">
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
            )}

            {session?.user.email && (
              <span className="mt-3 text-sm dark:text-white">
                Email Address:
                <p className="text-gray-400">{session?.user.email}</p>
              </span>
            )}
            {user.phone && (
              <span className="mt-3 flex flex-col text-sm dark:text-white">
                Phone number:
                <span className="text-gray-400">{user.phone}</span>
              </span>
            )}
            <form method="POST" action="/auth/logout">
              <button
                type="submit"
                className="mb-4 mr-2 mt-4 w-full rounded-xl bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-blue-800"
              >
                Log Out
              </button>
            </form>
          </div>
          {friends && (
            <div className="relative z-0 mt-3 flex w-full flex-col rounded-xl px-5 py-2.5 pb-3 shadow-md dark:bg-zinc-900">
              <h3 className="mx-1 mb-2 text-xl font-bold">Friends</h3>
              <div className={"flex flex-col gap-y-2 align-top"}>
                {friends.slice(0, 3).map((friend) => {
                  let status;
                  if (friend.pending) {
                    status =
                      friend.from.id === session.user.id
                        ? "pending"
                        : "toAccept";
                  } else {
                    status = "accepted";
                  }
                  const useTo = friend.to.id !== session.user.id;

                  return (
                    <Friend
                      key={`${friend.from.id}-${friend.to.id}`}
                      friend={friend}
                      status={status}
                      useTo={useTo}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="w-full sm:w-1/2 lg:w-2/3">
          <div className="flex w-full flex-col rounded-xl p-7 shadow-md dark:bg-zinc-900">
            <h3 className="text-xl font-bold">General information</h3>
            <>
              <span className="mt-3 text-sm dark:text-white">About me</span>
              <p className="mt-1 text-sm text-zinc-400 lg:w-4/5">
                {user?.about ?? "Add a bio in the edit page."}
              </p>
            </>
            <div
              className={`flex flex-col justify-between ${
                user?.about && "mt-6"
              } md:w-4/5 md:flex-row`}
            >
              {user.birth_date && (
                <span className="mt-3 text-sm dark:text-white">
                  Birthday:
                  <p className="w-60 text-gray-400">
                    {`${format(new Date(user?.birth_date), "PP")}`}
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
          <div
            id="liked-strains-container"
            className="max-h-98 transition-max-w xs:max-h-100 sm:max-h-102 overflow-y-hidden px-2 pt-3"
          >
            <div className="flex flex-row gap-x-1.5">
              <h2 className="mb-1.5 text-2xl font-bold">Liked Strains</h2>
              <h3 className="mt-[1.5px] text-lg font-bold text-zinc-400/90">
                ({likes?.length ?? 0})
              </h3>
            </div>
            <div className="flex w-full flex-row flex-wrap gap-x-1.5 gap-y-1.5 sm:justify-start sm:gap-x-1.5 sm:gap-y-2">
              {likes?.map((strain) => (
                <LikedStrain
                  key={strain.strain_id.id}
                  name={strain.strain_id.name}
                  image={strain.strain_id.nugImage}
                  slug={strain.strain_id.slug}
                />
              ))}
            </div>
          </div>
          <div className="mt-1 flex items-center justify-center px-2">
            <svg
              id="arrow-down-liked"
              stroke="currentColor"
              fill="none"
              strokeWidth="0"
              viewBox="0 0 15 15"
              height="35px"
              width="35px"
              className="transition-transform duration-200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
