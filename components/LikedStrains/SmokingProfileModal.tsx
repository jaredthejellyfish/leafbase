'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { RiPieChart2Fill } from 'react-icons/ri';
import React, { useState } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Modal from '../Modal';

function GraphSkeleton() {
  return (
    <div className="flex flex-col flex-wrap items-center">
      <div className="mb-2 flex flex-row flex-wrap">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="mb-2 ml-2 h-5 w-12 shrink-0 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"
          ></div>
        ))}
      </div>
      <div
        className={
          'mb-2 ml-2 h-60 w-60 animate-pulse rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 sm:h-96 sm:w-96'
        }
      ></div>
    </div>
  );
}

async function fetchSmokingProfile(
  profileType: 'combo' | 'terpenes' | 'effects',
) {
  const url = `/api/generate/smoking-profile?${profileType}=true`;
  const data = await fetch(url);

  if (!data.ok) {
    throw new Error(`Failed to fetch smoking profile: ${data.statusText}`);
  }

  const json = (await data.json()) as { data: { [key: string]: number } };

  if (!json) {
    throw new Error('Invalid data received');
  }

  const roundedValues = Object.values(json.data).map((value) =>
    Math.round(value),
  );

  return roundedValues;
}

export default function SmokingProfileModal() {
  const [open, setOpen] = useState(false);
  const [profileType, setProfileType] = useState<
    'combo' | 'terpenes' | 'effects'
  >('effects');

  const {
    data: smokingProfile,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['smoking-profile', profileType],
    queryFn: () => fetchSmokingProfile(profileType),
    enabled: open,
  });

  const handleBack = () => {
    if (profileType === 'combo') {
      setProfileType('effects');
    } else if (profileType === 'terpenes') {
      setProfileType('combo');
    } else {
      setProfileType('terpenes');
    }
  };

  const handleForward = () => {
    if (profileType === 'effects') {
      setProfileType('combo');
    } else if (profileType === 'combo') {
      setProfileType('terpenes');
    } else {
      setProfileType('effects');
    }
  };

  return (
    <>
      <ErrorBoundary
        fallback={<RiPieChart2Fill className="h-5 w-5 text-red-500" />}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center justify-center">
              <div onClick={() => setOpen(true)}>
                {!isFetching && !isError && (
                  <RiPieChart2Fill className="h-5 w-5" />
                )}
                {isFetching && (
                  <RiPieChart2Fill className="text-gradient-to-br h-5 w-5 animate-pulse from-gray-200 via-green-300 to-green-700" />
                )}
                {isError && (
                  <RiPieChart2Fill className="h-5 w-5 text-red-500" />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-semibold">Smoking Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Modal open={open} setOpen={setOpen} title={'Smoking Profile'}>
          <div className="mb-1 flex flex-row items-center justify-between px-3">
            <button onClick={handleBack}>
              <ArrowLeft className="h-6 w-6" />
            </button>
            <span className="font-regular text-base capitalize">
              {profileType}
            </span>
            <button onClick={handleForward}>
              <ArrowRight className="h-6 w-6" />
            </button>
          </div>
          {isFetching && <GraphSkeleton />}
          {smokingProfile && (
            <pre>
              <code>{JSON.stringify(smokingProfile, null, 2)}</code>
            </pre>
          )}
        </Modal>
      </ErrorBoundary>
    </>
  );
}
