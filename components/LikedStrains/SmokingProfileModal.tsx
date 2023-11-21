'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { useQuery } from '@tanstack/react-query';
import type { ChartData } from 'chart.js';
import { PieChart } from 'lucide-react';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('@/components/Modal'), { ssr: false });

const Pie = dynamic(() => import('react-chartjs-2').then((mod) => mod.Pie), {
  ssr: false,
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

async function fetchSmokingProfile(): Promise<
  ChartData<'pie', unknown, unknown>
> {
  const data = await fetch('/api/generate/smoking-profile?partial=true');

  // Check if the response is successful (status code 200)
  if (!data.ok) {
    throw new Error(`Failed to fetch smoking profile: ${data.statusText}`);
  }

  const json = (await data.json()) as { [key: string]: number };

  // Check if json is undefined or null
  if (!json) {
    throw new Error('Invalid data received');
  }
  const colors = Object.keys(json).map((_, index, array) =>
    generatePastelColor(array.slice(0, index))
  );

  const graphData: ChartData<'pie', unknown, unknown> = {
    labels: Object.keys(json),
    datasets: [
      {
        label: 'Smoking Profile',
        data: Object.values(json),
        backgroundColor: colors,
        borderWidth: 1,
        borderColor: colors,
      },
    ],
  };

  return graphData;
}

export default function SmokingProfileModal() {
  const [open, setOpen] = useState(false);
  const {
    data: smokingProfile,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['smoking-profile'],
    queryFn: fetchSmokingProfile,
    enabled: open,
  });

  if (open) {
    import('chart.js').then(({ Chart, ArcElement, Tooltip, Legend }) => {
      Chart.register(ArcElement, Tooltip, Legend);
    });
  }

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
        {smokingProfile && smokingProfile.datasets.length > 0 && (
          <Modal open={open} setOpen={setOpen} title={'Smoker Profile'}>
            <Pie
              data={smokingProfile}
              className="mb-2"
              options={{
                plugins: {
                  legend: {
                    labels: {
                      padding: 10, // Adjust this value as needed
                    },
                  },
                },
              }}
            />
          </Modal>
        )}
      </ErrorBoundary>
    </main>
  );
}
