import Image from 'next/image';
import Link from 'next/link';

function StrainCards({
  strains,
}: {
  strains: {
    slug: string;
    image: string;
    name: string;
  }[];
}) {
  if (!strains.length) return null;
  return (
    <span className="flex flex-row gap-x-3 flex-wrap max-w-[305px] sm:max-w-[600px] ">
      {strains?.map(({ slug, image, name }) => (
        <Link
          className="xs:w-[80px] flex w-[85] flex-col items-center rounded-lg dark:border bg-zinc-100/20 shadow dark:border-transparent dark:bg-zinc-700/70 mt-2"
          href={`/strains/${slug}`}
          key={slug}
        >
          <span className="mx-2 mb-1 mt-2 size-[62px] rounded dark:border bg-zinc-300/50 p-0.5 shadow dark:border-zinc-700/80 dark:bg-zinc-600/30 sm:size-[68px]">
            <Image alt={slug} width={66} height={66} src={image} />
          </span>
          <span className="mb-1.5 max-w-[64px] truncate py-1 text-xs">
            {name}
          </span>
        </Link>
      ))}
    </span>
  );
}

export default StrainCards;
