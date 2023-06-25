import useServerUser from "@/hooks/useServerUser";
import React from "react";
import Image from "next/image";
import { MdLocationPin } from "react-icons/md";
import Link from "next/link";
import moment from "moment";
import ProfileRevalidator from "@/components/ProfileRevalidator/ProfileRevalidator";
import { User } from "@prisma/client";
import md5 from "md5";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

type Props = { params: { displayName: string } };

interface ReducedStrain {
  id: string;
  slug: string;
  nugImage: string;
  name: string;
}

const generateGravatarUrl = (user: User): string => {
  if (user?.image) return user.image;
  return `https://www.gravatar.com/avatar/${md5(
    user.name || "NaN"
  )}?d=identicon`;
};

const getLikesByUUID = async (userId: string) => {
  try {
    const likes = await prisma.like.findMany({
      where: {
        userId: userId,
      },
      include: {
        strain: {
          select: {
            id: true,
            slug: true,
            nugImage: true,
            name: true,
          },
        },
      },
    });

    const likedStrains = likes.map((like) => like.strain as ReducedStrain);

    return likedStrains;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

type MetadataProps = { params: { displayName: string } };

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const displayName = params.displayName;

  return {
    title: `${displayName} - Leafbase` || "Strain",
  };
}

const ProfileDisplay = async (props: Props) => {
  const user = await useServerUser(props.params.displayName);
  if (!user) return <div>User not found.</div>;
  const strains = await getLikesByUUID(user?.id);

  return (
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
                {user?.displayName}
              </div>
            </div>
          </li>
        </ol>
      </nav>
      <div className="flex flex-col gap-6 mt-3 lg:flex-row">
        <div id="vertical 1" className="flex flex-col gap-4 lg:w-1/3">
          <div className="relative z-0 flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
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
          </div>
        </div>
        <div id="vertical 2" className="flex flex-col gap-4 lg:w-2/3">
          <div className="flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
            <h1 className="text-xl font-bold">General information</h1>
            <h2 className="mt-4 text-lg">About me</h2>
            <p className="mt-1 text-sm text-zinc-400 lg:w-4/5">
              {user?.aboutMe}
            </p>

            <div className="flex flex-col justify-between mt-6 md:flex-row md:w-4/5">
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
            <div>
              <span className="text-xl font-bold ">
                Liked Strains ({strains?.length})
              </span>
              {strains?.length === 0 ? (
                <div className="mt-6 text-sm text-semi text-zinc-400">
                  {user.displayName} hasn&apos;t liked any strains yet!
                </div>
              ) : (
                <div className="flex flex-row flex-wrap items-center justify-center mt-3 md:justify-start gap-y-3">
                  {strains &&
                    strains.map((strain: ReducedStrain) => (
                      <Link
                        key={strain.id}
                        className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600"
                        href={`/strains/${strain.slug}`}
                      >
                        <div
                          style={{ maxHeight: "90px", maxWidth: "90px" }}
                          className="flex items-center justify-center bg-white rounded-md aspect-square"
                        >
                          <Image
                            src={strain.nugImage}
                            className="rounded-md"
                            alt={strain.name}
                            width={90}
                            height={90}
                            priority={true}
                          />
                        </div>
                        <h1 className="w-20 text-sm truncate text-semi">
                          {strain.name}
                        </h1>
                      </Link>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ProfileRevalidator />
    </div>
  );
};

export default ProfileDisplay;
