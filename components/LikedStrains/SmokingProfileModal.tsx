'use client';

import { ArrowLeft, ArrowRight, PieChart } from 'lucide-react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQuery } from '@tanstack/react-query';
import type { ChartData } from 'chart.js';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('@/components/Modal'), { ssr: false });

const Pie = dynamic(() => import('react-chartjs-2').then((mod) => mod.Pie), {
  ssr: false,
  loading: () => <GraphSkeleton />,
});

const generatePastelColor = (usedColors: string[]) => {
  const min = 150; // Minimum value for red, green, and blue to ensure pastel colors
  const max = 255; // Maximum value for red, green, and blue to ensure pastel colors

  let randomColor: string;
  let colorIsClose;

  do {
    randomColor = `rgba(${Math.floor(Math.random() * (max - min + 1)) + min}, ${
      Math.floor(Math.random() * (max - min + 1)) + min
    }, ${Math.floor(Math.random() * (max - min + 1)) + min}, 0.5)`;

    // Check if the generated color is too close to any existing color
    colorIsClose = usedColors.some((existingColor) => {
      // You can adjust this threshold as needed
      const colorDistanceThreshold = 100;

      // Calculate the Euclidean distance between the two colors
      const colorDistance = Math.sqrt(
        existingColor
          .split(',')
          .slice(0, 3)
          .map((c, i) =>
            Math.pow(
              parseInt(c, 10) - parseInt(randomColor.split(',')[i], 10),
              2
            )
          )
          .reduce((acc, val) => acc + val, 0)
      );

      return colorDistance < colorDistanceThreshold;
    });
  } while (colorIsClose);

  return randomColor;
};

function GraphSkeleton() {
  return (
    <div className="flex flex-col items-center flex-wrap">
      <div className="flex flex-row flex-wrap mb-2">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="w-12 h-5 mb-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse ml-2 flex-shrink-0"
          ></div>
        ))}
      </div>
      <div
        className={
          'w-60 h-60 sm:w-96 sm:h-96 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse ml-2 mb-2 rounded-full'
        }
      ></div>
    </div>
  );
}

async function fetchSmokingProfile(
  profileType: 'combo' | 'terpenes' | 'effects'
): Promise<ChartData<'pie', unknown, unknown>> {
  const url = `/api/generate/smoking-profile?${profileType}=true`;
  const data = await fetch(url);

  if (!data.ok) {
    throw new Error(`Failed to fetch smoking profile: ${data.statusText}`);
  }

  const json = (await data.json()) as { data: { [key: string]: number } };

  if (!json) {
    throw new Error('Invalid data received');
  }
  const colors = Object.keys(json.data).map((_, index, array) =>
    generatePastelColor(array.slice(0, index))
  );

  const roundedValues = Object.values(json.data).map((value) =>
    Math.round(value)
  );

  const graphData: ChartData<'pie', unknown, unknown> = {
    labels: Object.keys(json.data),
    datasets: [
      {
        label: 'Smoking Profile',
        data: roundedValues,
        backgroundColor: colors,
        borderWidth: 1,
        borderColor: colors,
      },
    ],
  };

  return graphData;
}

const options = {
  plugins: {
    datalabels: {
      display: false,
    },
    zoom: {
      zoom: {
        drag: {
          enabled: false,
        },
        pinch: {
          enabled: false,
        },
        mode: 'xy',
      },
    },
  },
};

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
    <main>
      <button
        className={'flex items-center justify-center'}
        onClick={() => setOpen(true)}
      >
        {!isFetching && !isError && <PieChart className="w-6 h-6" />}
        {isFetching && (
          <PieChart className="text-gradient-to-br from-gray-200 via-green-300 to-green-700 animate-pulse" />
        )}
        {isError && <PieChart className="text-red-500" />}
      </button>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <Modal open={open} setOpen={setOpen} title={'Smoker Profile'}>
          <div className="flex flex-row items-center justify-between px-3 mb-1">
            <button onClick={handleBack}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <span className="capitalize text-base font-regular">
              {profileType}
            </span>
            <button onClick={handleForward}>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          {smokingProfile && smokingProfile.datasets.length > 0 ? (
            // @ts-expect-error - zoom plugin options broken
            <Pie data={smokingProfile} className="mb-2" options={options} />
          ) : (
            <GraphSkeleton />
          )}
        </Modal>
      </ErrorBoundary>
    </main>
  );
}
