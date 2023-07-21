import React from 'react';
import useServerDispensary from '@/hooks/useServerDispensary';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Metadata } from 'next/types';
import { ErrorBoundary } from 'react-error-boundary';
import Comments from './components/Comments/Comments';
import 'leaflet/dist/leaflet.css';
import ProfileSkeleton from './components/Profile/ProfileSkeleton';
import GeneralInformationSkeleton from './components/GeneralInformation/GeneralInformationSkeleton';
import Menu from './components/Menu/Menu';
import dynamic from 'next/dynamic';
import DispensaryMapDynamic from './components/DispensaryMap/DispensaryMap';

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

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  const dispensary = await prisma.dispensary.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!dispensary)
    return { title: 'Error - Leafbase', description: 'Dispensary' };

  return {
    title: `${dispensary?.name} - Leafbase` || 'Dispensary',
    description:
      dispensary?.description || `Description page for ${dispensary?.name}`,
  };
}

const DispensaryPage = async ({ params }: Props) => {
  const slug = params.slug;

  const { dispensary, error } = await useServerDispensary(slug);

  if (error || !dispensary) throw new Error('Dispensary not found');

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
            <Link href="/dispensaries" className="flex items-center">
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
                Dispensaries
              </div>
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
                {dispensary?.name}
              </div>
            </div>
          </li>
        </ol>
      </nav>
      <div className="flex flex-col gap-6 mt-3 lg:flex-row">
        <div id="vertical 1" className="flex flex-col gap-4 lg:w-1/3">
          <ErrorBoundary fallback={<div>Error</div>}>
            <Profile dispensary={dispensary} />
          </ErrorBoundary>
          <ErrorBoundary fallback={<div>Error</div>}>
            <Comments dispensary={dispensary} />
          </ErrorBoundary>

          <DispensaryMapDynamic
            lat={dispensary.latitude || 0}
            lon={dispensary.longitude || 0}
          />
        </div>
        <div id="vertical 2" className="flex flex-col gap-4 pb-3 lg:w-2/3">
          <ErrorBoundary fallback={<div>Error</div>}>
            <GeneralInformation
              description={dispensary?.description || undefined}
            />
          </ErrorBoundary>
          <ErrorBoundary fallback={<div>Error</div>}>
            <Menu
              prices={dispensary.menus[0].prices}
              strains={dispensary.menus[0].strains}
            />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default DispensaryPage;
