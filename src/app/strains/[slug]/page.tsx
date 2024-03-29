import Image from 'next/image';
import { notFound } from 'next/navigation';

import LikeButton from '@c/LikeButton';
import NavBreadcrumbs from '@c/NavBreadcrumbs';
import StarRating from '@c/StarRating';
import StrainSoma from '@c/StrainSoma';
import StrainSuggestions from '@c/StrainSuggestions';

import { getServerLikedStrains } from '@u/getServerLikedStrains';
import { getServerStrain } from '@u/getServerStrain';
import { getStrainsSSG } from '@u/getStrainsSSG';

import { effects, terpenes } from '@l/data/colors';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs = await getStrainsSSG();

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

async function StrainPage({ params: { slug } }: Props) {
  const strain = await getServerStrain(slug);
  const { likes } = await getServerLikedStrains();

  if (!strain) {
    return notFound();
  }
  return (
    <main className="justify-center px-5 py-3 md:px-16">
      <NavBreadcrumbs
        urls={[
          { name: 'Strains', url: '/strains' },
          {
            name: strain.name,
            url: `/strains/${strain.slug}`,
          },
        ]}
      />
      <div
        id="card"
        className="relative flex flex-col items-center justify-center rounded border border-zinc-300 pb-8 shadow dark:border-transparent dark:bg-zinc-900"
      >
        {likes && (
          <div className="absolute top-4 right-10 flex flex-row items-center justify-center gap-x-4">
            <StrainSuggestions slug={strain.slug} id={strain.id} />
            <LikeButton
              iconSize={20}
              liked={likes?.includes(strain.id)}
              strain_id={strain.id}
            />
          </div>
        )}
        <div
          id="header"
          className="flex w-full flex-col items-center justify-center gap-8 px-5 pt-8 md:flex-row md:px-8"
        >
          <div
            id="vertical-1"
            className="flex h-52 items-center justify-center rounded-sm md:w-1/3 md:border md:shadow-sm md:dark:border-neutral-700 md:dark:bg-zinc-950/10 md:dark:shadow"
          >
            <Image
              className="rounded"
              src={strain.nugImage!}
              alt={strain?.slug}
              width={200}
              priority
              id="strain-image"
              height={200}
            />
          </div>
          <div id="vertical-2" className="w-full md:w-2/3">
            <div className="mb-2 flex flex-row items-center gap-3">
              {strain.phenotype && (
                <div className="inline-block rounded bg-gray-200 px-2 py-1 text-xs font-medium dark:bg-zinc-700 dark:shadow">
                  {strain.phenotype}
                </div>
              )}
              <div className="flex flex-row gap-4 px-1 text-xs text-zinc-500 dark:text-zinc-300">
                {strain.thcPercent ? (
                  <span className="">
                    THC {strain.thcPercent && strain.thcPercent}%
                  </span>
                ) : null}
                {strain.cannabinoids?.cbd?.percentile50 ? (
                  <span className="">
                    CBD: {strain?.cannabinoids?.cbd?.percentile50}%
                  </span>
                ) : null}
              </div>
            </div>
            <h1 className="mb-0.5 text-2xl font-bold">{strain.name}</h1>
            <h2 className="font-semi min-h-10 text-zinc-400 md:w-2/3">
              {strain.subtitle}
            </h2>
            <span className="mt-1 flex w-48 items-center justify-start gap-3 text-zinc-800 dark:text-zinc-200">
              {strain.averageRating &&
                Math.round(strain.averageRating * 10) / 10}
              <StarRating rating={strain.averageRating ?? 0} />
            </span>
            <div className="mt-1 flex flex-row gap-3 text-sm font-medium capitalize">
              <span className="flex flex-row items-center gap-1">
                <div
                  style={{
                    backgroundColor:
                      effects[strain.topEffect ?? 'rgb(70, 130, 180)'],
                  }}
                  className="h-2.5 w-2.5 rounded-full"
                ></div>
                <p className="p-0">{strain.topEffect}</p>
              </span>
              <span className="flex flex-row items-center gap-1">
                <div
                  style={{
                    backgroundColor:
                      terpenes[strain.topTerpene ?? 'rgb(70, 130, 180)'],
                  }}
                  className="h-2.5 w-2.5 rounded-full"
                ></div>
                <p className="p-0">{strain.topTerpene}</p>
              </span>
            </div>
          </div>
        </div>
        <div
          id="body"
          className="flex w-full flex-col justify-center gap-5 px-5 md:flex-row md:px-8"
        >
          <div className="mt-3 md:w-1/3">
            <StrainSoma strain={strain} />
          </div>
          <div className="px-0.5 md:w-2/3" id="strain-description">
            {strain.description}
          </div>
        </div>
      </div>

      <div className="mt-5">
        {/* <CommentSection
      strainName={strain.name}
      comments={strain.strain_comments}
      strainId={strain.id}
      strainSlug={strain.slug}
      session={session}
    /> */}
      </div>
    </main>
  );
}

export default StrainPage;
