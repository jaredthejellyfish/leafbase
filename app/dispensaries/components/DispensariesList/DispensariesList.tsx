'use client';

import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { User } from '@prisma/client';
import React from 'react';

import DispensariesTableSkeleton from './DispensariesTableSkeleton';
import DispensariesTableError from './DispensariesTableError';
import { nearbyDispensary } from '@/types/interfaces';
import DispensaryTable from './DispensaryTable';
import { RootState } from '@/store/store';

type Props = { user: User | null };

const getNearbyDispensaries = async (
  lat?: number,
  lon?: number,
  city?: string
) => {
  const res = await fetch(`/api/dispensaries/nearby`, {
    method: 'POST',
    body: JSON.stringify({
      lat: lat,
      lon: lon,
      city: city,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    const dispensaries = (await res.json()) as {
      dispensaries: nearbyDispensary[];
    };
    return dispensaries.dispensaries;
  } else {
    return [];
  }
};

const DispensariesList = (props: Props) => {
  const coordinates = useSelector(
    (state: RootState) => state.userCoordinates.userCoordinates
  );

  const {
    data: dispensaries,
    isLoading: dispensariesLoading,
    error: dispensariesError,
  } = useQuery({
    queryKey: [
      'nearby-dispensaries',
      [coordinates?.lat, coordinates?.lon, props.user?.location],
    ],
    queryFn: () =>
      getNearbyDispensaries(
        coordinates?.lat,
        coordinates?.lon,
        props.user?.location
      ),
    enabled: Boolean(
      (coordinates?.lat && coordinates.lon) || props.user?.location
    ),
  });

  return (
    <div className="lg:w-[28vw] mt-1 pb-3 lg:h-screen-bar rounded-lg mr-1.5 overflow-y-scroll shadow-lg border border-zinc-100 dark:border-zinc-900 dark:bg-zinc-900">
      <div className="relative overflow-x-auto sm:rounded-lg">
        <div className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-zinc-900">
          Nearby Dispensaries
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda
            culpa temporibus saepe sunt aliquam rem provident quam at aliquid
            nisi totam, sint nulla.
          </p>
        </div>
        {dispensariesLoading && !dispensariesError && (
          <>
            <DispensariesTableSkeleton />
            <DispensariesTableSkeleton />
            <DispensariesTableSkeleton />
            <DispensariesTableSkeleton />
            <DispensariesTableSkeleton />
            <DispensariesTableSkeleton />
          </>
        )}

        {!dispensariesLoading &&
          !dispensariesError &&
          dispensaries &&
          dispensaries.length > 0 &&
          dispensaries.map((dispensary) => (
            <DispensaryTable key={dispensary.id} dispensary={dispensary} />
          ))}

        {(!dispensaries || dispensaries.length < 1) && !dispensariesLoading && (
          <DispensariesTableError />
        )}
      </div>
    </div>
  );
};

export default DispensariesList;
