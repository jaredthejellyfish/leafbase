import React, { Suspense } from "react";
import useServerUser from "@/hooks/useServerUser";
import Image from "next/image";
import { MdLocationPin } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import Link from "next/link";
import SingOutButton from "@/components/SingOutButton/SingOutButton";
import moment from "moment";
import ProfileRevalidator from "@/components/ProfileRevalidator/ProfileRevalidator";
import LikedStrains from "@/components/LikedStrains/LikedStrains";
import { User } from "@prisma/client";
import md5 from "md5";
import ProfileComments from "@/components/ProfileComments/ProfileComments";
import { BsClipboardDataFill } from "react-icons/bs";

type Props = {};

export const metadata = {
  title: "Profile - Leafbase",
  description:
    "Explore your personal user page, showcasing your profile, comments, and a curated list of your favorite cannabis strains. Stay updated and engaged with the community.",
};

const LikedStrainsSkeleton = () => (
  <>
    <div className="flex flex-row items-center gap-8 text-xl font-bold">
      <p>Liked Strains ( )</p>
      <BsClipboardDataFill size={20} className="inline-block mr-12" />
    </div>
    <div className="flex flex-row flex-wrap items-center justify-center mt-3 md:justify-start gap-y-3">
      <div className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600">
        <div
          style={{ maxHeight: "90px", maxWidth: "90px" }}
          className="flex items-center justify-center w-24 bg-white rounded-md aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
        ></div>
        <h1 className="text-sm text-semi">
          <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </h1>
      </div>
      <div className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600">
        <div
          style={{ maxHeight: "90px", maxWidth: "90px" }}
          className="flex items-center justify-center w-24 bg-white rounded-md aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
        ></div>
        <h1 className="text-sm text-semi">
          <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </h1>
      </div>
      <div className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600">
        <div
          style={{ maxHeight: "90px", maxWidth: "90px" }}
          className="flex items-center justify-center w-24 bg-white rounded-md aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
        ></div>
        <h1 className="text-sm text-semi">
          <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </h1>
      </div>
      <div className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600">
        <div
          style={{ maxHeight: "90px", maxWidth: "90px" }}
          className="flex items-center justify-center w-24 bg-white rounded-md aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
        ></div>
        <h1 className="text-sm text-semi">
          <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </h1>
      </div>
      <div className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600">
        <div
          style={{ maxHeight: "90px", maxWidth: "90px" }}
          className="flex items-center justify-center w-24 bg-white rounded-md aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
        ></div>
        <h1 className="text-sm text-semi">
          <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </h1>
      </div>
      <div className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600">
        <div
          style={{ maxHeight: "90px", maxWidth: "90px" }}
          className="flex items-center justify-center w-24 bg-white rounded-md aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
        ></div>
        <h1 className="text-sm text-semi">
          <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </h1>
      </div>
    </div>
  </>
);

const ProfileCommentsSkeleton = () => (
  <div className="relative z-0 flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
    <h1 className="text-xl font-bold">Comments</h1>
    <div className="flex flex-col gap-2 mt-2">
      <div className="px-3 py-2 text-sm rounded-lg shadow dark:border dark:border-zinc-500">
        <h2 className="mb-3 text-base font-semibold">
          <div className="w-20 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </h2>
        <p className="text-zinc-400">
          <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          <div className="w-2/5 h-3 mt-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </p>
      </div>
      <div className="px-3 py-2 text-sm rounded-lg shadow dark:border dark:border-zinc-500">
        <h2 className="mb-3 text-base font-semibold">
          <div className="w-20 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </h2>
        <p className="text-zinc-400">
          <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          <div className="w-2/5 h-3 mt-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </p>
      </div>
      <div className="px-3 py-2 text-sm rounded-lg shadow dark:border dark:border-zinc-500">
        <h2 className="mb-3 text-base font-semibold">
          <div className="w-20 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </h2>
        <p className="text-zinc-400">
          <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          <div className="w-2/5 h-3 mt-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </p>
      </div>
      <div className="px-3 py-2 text-sm rounded-lg shadow dark:border dark:border-zinc-500">
        <h2 className="mb-3 text-base font-semibold">
          <div className="w-20 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </h2>
        <p className="text-zinc-400">
          <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          <div className="w-2/5 h-3 mt-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </p>
      </div>
    </div>
  </div>
);

const generateGravatarUrl = (user: User): string => {
  if (user?.image) return user.image;
  return `https://www.gravatar.com/avatar/${md5(
    user?.name || "NaN"
  )}?d=identicon`;
};

async function UserProfile({}: Props) {
  const user = await useServerUser();

  if (!user) return <div>failed to load</div>;

  return (
    <>
      <div className="flex flex-col px-6 md:px-16">
        <nav className="flex ml-1" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex items-center text-lg font-medium text-gray-700 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div className="ml-1 text-lg font-medium text-gray-700 hover:text-green-600 md:ml-2 dark:text-gray-400 dark:hover:text-green-400">
                  Profile
                </div>
              </div>
            </li>
          </ol>
        </nav>
        <div className="flex flex-col gap-6 mt-3 lg:flex-row">
          <div id="vertical 1" className="flex flex-col gap-4 lg:w-1/3">
            <div className="relative z-0 flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
              <Link href="/profile/edit">
                <AiFillEdit size={20} className="absolute top-6 right-6" />
              </Link>
              <Image
                src={generateGravatarUrl(user as User)}
                alt="profile"
                className="rounded-md"
                width={80}
                height={80}
              />
              <p className="mt-2 text-lg font-bold ">{user?.name}</p>
              {user?.displayName ? (
                <>
                  <span className="flex flex-row items-center gap-1 text-sm text-zinc-300">
                    <span className="text-zinc-400">{user?.displayName}</span>
                  </span>
                  <span className="mt-3 text-sm dark:text-white">
                    Location:
                    <span className="flex flex-row items-center gap-1 text-sm text-zinc-300">
                      <MdLocationPin />
                      <span className="text-zinc-400">{user?.location}</span>
                    </span>
                  </span>
                </>
              ) : (
                <span className="flex flex-row items-center gap-1 text-sm text-zinc-300">
                  <MdLocationPin />
                  <span className="text-zinc-400">{user?.location}</span>
                </span>
              )}

              <span className="mt-3 text-sm dark:text-white">
                Email Address:
                <p className="text-gray-400">{user?.email}</p>
              </span>
              <span className="mt-3 text-sm dark:text-white">
                Phone number:
                <p className="text-gray-400">{user?.phone}</p>
              </span>
              <SingOutButton />
            </div>
            <Suspense fallback={<ProfileCommentsSkeleton />}>
              <ProfileComments user={user} />
            </Suspense>
          </div>
          <div id="vertical 2" className="flex flex-col gap-4 pb-3 lg:w-2/3">
            <div className="flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
              <h1 className="text-xl font-bold">General information</h1>
              {user?.aboutMe && (
                <>
                  <h2 className="mt-4 text-lg">About me</h2>
                  <p className="mt-1 text-sm text-zinc-400 lg:w-4/5">
                    {user?.aboutMe}
                  </p>
                </>
              )}

              <div
                className={`flex flex-col justify-between ${
                  user?.aboutMe && "mt-6"
                } md:flex-row md:w-4/5`}
              >
                <span className="mt-3 text-sm dark:text-white">
                  Birthday:
                  <p className="text-gray-400 w-60">
                    {`${moment(user?.birthDate).format("LL")} - (${Math.ceil(
                      moment
                        .duration(
                          moment()
                            .year(moment().year())
                            .month(moment(user?.birthDate).month())
                            .date(moment(user?.birthDate).date())
                            .diff(moment())
                        )
                        .asDays()
                    )} days)`}
                  </p>
                </span>
                <span className="mt-3 text-sm dark:text-white">
                  Languages:
                  <p className="text-gray-400 w-60">{user?.languages}</p>
                </span>
              </div>
            </div>
            <div className="flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
              <Suspense fallback={<LikedStrainsSkeleton />}>
                <LikedStrains />
              </Suspense>
            </div>
          </div>
        </div>
        <ProfileRevalidator />
      </div>
    </>
  );
}

export default UserProfile;

export const dynamic = "force-dynamic";
