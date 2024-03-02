import Link from "next/link";
import Image from "next/image";
import React from "react";

function LikedStrain({
  name,
  image,
  slug,
}: {
  name: string;
  image: string;
  slug: string;
}) {
  return (
    <Link
      className="xs:w-[110px] xs:scale-95 flex w-[100] flex-col items-center rounded-lg border bg-zinc-100/20 shadow dark:border-transparent dark:bg-zinc-800/70 sm:w-[125px]"
      href={`/strains/${slug}`}
    >
      <div className="mx-2 mb-1 mt-2 size-[80px] rounded border bg-zinc-300/50 p-0.5 shadow dark:border-zinc-700/80 dark:bg-zinc-700/30 sm:size-[98px]">
        <Image alt={slug} width={96} height={96} src={image} />
      </div>
      <span className="mb-1.5 max-w-[94px] truncate py-1 text-xs sm:text-base">
        {name}
      </span>
    </Link>
  );
}


export default LikedStrain