import React from "react";
import Image from "next/image";
import Link from "next/link";
import useServerUser from "@/hooks/useServerUser";
import prisma from "@/lib/prisma";
import { StrainExtended } from "@/types/interfaces";
import { User } from "@prisma/client";
import LikedStrainsModal from "./LikedStrainsModal";

type Props = {};

type Strain = {
  id: string;
  slug: string;
  nugImage: string;
  name: string;
};

const getLikedStrains = async (user: User) => {
  const likes = await prisma.like.findMany({
    where: {
      userId: user?.id,
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
  const likedStrains = likes.map((like) => like.strain as StrainExtended);

  // sort them by name
  const sortedLikedStrains = likedStrains.sort((a, b) => {
    if (a.name < b.name) return -1;
    else if (a.name > b.name) return 1;
    else return 0;
  });

  return sortedLikedStrains;
};

const LikedStrains = async (props: Props) => {
  const user = (await useServerUser()) as User;
  const strains = await getLikedStrains(user);

  return (
    <div>
      <div className="flex flex-row items-center gap-8 text-xl font-bold">
        <p>Liked Strains ({strains?.length})</p>
        <LikedStrainsModal strains={strains} />
      </div>

      {strains && strains.length === 0 ? (
        <div className="mt-6 text-sm text-semi text-zinc-400">
          You haven&apos;t liked any strains yet!
        </div>
      ) : (
        <div className="flex flex-row flex-wrap items-center justify-center mt-3 md:justify-start gap-y-3">
          {strains &&
            strains.map((strain: Strain) => (
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
  );
};

export default LikedStrains;
