'use client';

import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { RiPieChart2Fill } from 'react-icons/ri';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@c/ui/tooltip';

import type { SmokingProfile } from '@l/types';

import Modal from '../Modal';
import ResponsivePieChart from './PieChart';

function GraphSkeleton() {
  return (
    <div className="flex flex-col flex-wrap items-center">
      <div
        className={
          'mb-2 ml-2 size-60 animate-pulse rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 sm:size-96'
        }
      ></div>
    </div>
  );
}

async function fetchSmokingProfile() {
  const data = await fetch('/api/graph/smoking-profile');

  if (!data.ok) {
    throw new Error(`Failed to fetch smoking profile: ${data.statusText}`);
  }

  const json = (await data.json()) as SmokingProfile;

  if (!json) {
    throw new Error('Invalid data received');
  }

  return json;
}

export default function SmokingProfileModal() {
  const [open, setOpen] = useState(false);
  const [profileType, setProfileType] = useState<'terpenes' | 'effects'>(
    'effects',
  );

  const {
    data: smokingProfile,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['smoking-profile'],
    queryFn: () => fetchSmokingProfile(),
    enabled: open,
  });

  const handleBack = () => {
    if (profileType === 'terpenes') {
      setProfileType('effects');
    } else {
      setProfileType('terpenes');
    }
  };

  const handleForward = () => {
    if (profileType === 'terpenes') {
      setProfileType('effects');
    } else {
      setProfileType('terpenes');
    }
  };

  const displayData: Record<string, number> | undefined =
    profileType === 'effects'
      ? smokingProfile?.effects
      : profileType === 'terpenes'
        ? smokingProfile?.terps
        : { ...smokingProfile?.effects, ...smokingProfile?.terps };

  return (
    <>
      <ErrorBoundary
        fallback={<RiPieChart2Fill className="size-5 text-red-500" />}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center justify-center">
              <div onClick={() => setOpen(true)}>
                {!isFetching && !isError && (
                  <RiPieChart2Fill className="size-5" />
                )}
                {isFetching && (
                  <RiPieChart2Fill className="text-gradient-to-br size-5 animate-pulse from-gray-200 via-green-300 to-green-700" />
                )}
                {isError && <RiPieChart2Fill className="size-5 text-red-500" />}
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
              <ArrowLeft className="size-6" />
            </button>
            <span className="font-regular text-base capitalize">
              {profileType}
            </span>
            <button onClick={handleForward}>
              <ArrowRight className="size-6" />
            </button>
          </div>
          {isFetching && <GraphSkeleton />}
          {!isFetching && displayData && (
            <div className="mt-3 h-[40vh]">
              <ResponsivePieChart data={displayData} />
            </div>
          )}
        </Modal>
      </ErrorBoundary>
    </>
  );
}
