import { ErrorBoundary } from 'react-error-boundary';
import { MdError } from 'react-icons/md';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import React from 'react';

import GeneralInformationSkeleton from './components/GeneralInformation/GeneralInformationSkeleton';
import DispensaryMapSkeleton from './components/DispensaryMap/DispensaryMapSkeleton';
import DispensaryMapDynamic from './components/DispensaryMap/DispensaryMapDynamic';
import NavBreadcrumbs from '@/components/NavBreadcrumbs/NavBreadcrumbs';
import CommentsSkeleton from './components/Comments/CommentsSkeleton';
import ProfileSkeleton from './components/Profile/ProfileSkeleton';
import useServerDispensary from '@/hooks/useServerDispensary';
import Comments from './components/Comments/Comments';
import Menu from './components/Menu/Menu';
import prisma from '@/lib/prisma';

export async function generateStaticParams() {
  const dispensaries = await prisma.dispensary.findMany({
    select: {
      slug: true,
    },
  });

  return dispensaries.map((dispensary) => ({
    slug: dispensary.slug,
  }));
}

const Profile = dynamic(() => import('./components/Profile/Profile'), {
  ssr: false,
  loading: () => <ProfileSkeleton />,
});

const GeneralInformation = dynamic(
  () => import('./components/GeneralInformation/GeneralInformation'),
  {
    ssr: false,
    loading: () => <GeneralInformationSkeleton />,
  }
);

interface Price {
  strainId: string;
  price: number;
}

type Props = { params: { slug: string } };

const Dispensary = async ({ params }: Props) => {
  const slug = params.slug;

  const { dispensary, error } = await useServerDispensary(slug);

  if (error || !dispensary)
    return (
      <div className="absolute top-0 flex flex-col items-center justify-center w-screen h-screen">
        <MdError size={80} className="text-green-700" />
        <h1 className="mt-5 text-3xl font-semibold text-gray-700 dark:text-gray-400">
          Dispensary not found!
        </h1>
        <p className="mt-5 text-lg text-gray-700 dark:text-gray-400">
          We couldn&apos;t find the requested dispensary in our database.
        </p>
        <Link
          href="/dispensaries"
          className="mt-5 text-lg font-medium text-green-700 hover:text-green-800 dark:text-green-700 dark:hover:text-green-600"
        >
          Return to Dispensaries
        </Link>
      </div>
    );

  return (
    <div className="flex flex-col px-6 md:px-16">
      <NavBreadcrumbs
        urls={[
          { name: 'Dispensaries', url: '/dispensaries' },
          {
            name: dispensary.name as string,
            url: `/dispensaries/${dispensary.slug}`,
          },
        ]}
      />
      <div className="flex flex-col gap-6 mt-3 lg:flex-row">
        <div id="vertical 1" className="flex flex-col gap-4 lg:w-1/3">
          <ErrorBoundary fallback={<ProfileSkeleton />}>
            <Profile dispensary={dispensary} />
          </ErrorBoundary>
          <ErrorBoundary fallback={<DispensaryMapSkeleton />}>
            {dispensary.latitude && dispensary.longitude && (
              <DispensaryMapDynamic
                lat={dispensary.latitude || 0}
                lon={dispensary.longitude || 0}
                address={dispensary.address || ''}
                dispensary={dispensary}
              />
            )}
          </ErrorBoundary>
          <ErrorBoundary fallback={<CommentsSkeleton />}>
            <Comments dispensary={dispensary} />
          </ErrorBoundary>
        </div>
        <div id="vertical 2" className="flex flex-col gap-4 pb-3 lg:w-2/3">
          <ErrorBoundary fallback={<GeneralInformationSkeleton />}>
            {dispensary.description && (
              <GeneralInformation
                description={dispensary?.description || undefined}
              />
            )}
          </ErrorBoundary>
          <ErrorBoundary fallback={<div>Error</div>}>
            {dispensary.menus.length > 0 && (
              <Menu
                prices={dispensary.menus[0].prices as unknown as Price[]}
                strains={dispensary.menus[0].strains}
              />
            )}
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default Dispensary;
