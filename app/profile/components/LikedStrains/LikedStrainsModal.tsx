'use client';

import { StrainExtended } from '@/types/interfaces';
import React, { useState } from 'react';
import { BsClipboardDataFill } from 'react-icons/bs';
import { Scatter } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Align } from 'chart.js';
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('@/components/Modal/Modal'), {
  loading: () => <div></div>,
  ssr: false,
});

interface Context {
  dataset: { label: string };
}

interface Value {
  x: number;
  y: number;
}

type Props = {
  strains: StrainExtended[];
};

interface LikedStrainPoint {
  name: string;
  x: number;
  y: number;
}

const fetchLikedStrainsData = async (strainNames: string[]) => {
  const res = await fetch(`/api/recommendations/liked-plot`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      strains: strainNames,
    }),
  });
  const data = (await res.json()) as { likedStrainsData: LikedStrainPoint[] };

  if (!data.likedStrainsData) return [];

  return data.likedStrainsData;
};

const generateDatasetsFromData = (data: LikedStrainPoint[]) => {
  const datasets = [];

  // Loop through each item in the data
  for (let i = 0; i < data.length; i++) {
    const point = data[i];

    // Create a new dataset for each item
    datasets.push({
      label: point.name,
      data: [{ x: point.x, y: point.y }],
      backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 1)`,
      pointRadius: 8,
    });
  }

  return { datasets: datasets };
};

const LikedStrainsModal = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const strainNames = props.strains.map((strain) => strain.name);
  const currentTheme = useSelector((state: RootState) => state.theme);

  const options = {
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 30,
      },
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        },
      },
      datalabels: {
        formatter: function (value: Value, context: Context) {
          return context.dataset.label;
        },
        display: true,
        color: currentTheme.theme === 'dark' ? 'white' : 'black',
        align: 'right' as Align,
        offset: 10,
      },
      legend: {
        display: false,
        labels: {
          usePointStyle: true,
        },
      },
    },
  };

  const {
    data: likedStrainsData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['liked-strains', strainNames],
    queryFn: () => fetchLikedStrainsData(strainNames),
    enabled: isModalOpen,
  });

  if (isModalOpen === true)
    import('chart.js').then(
      ({ Chart, ArcElement, Tooltip, Legend, LinearScale, PointElement }) =>
        Chart.register(
          ArcElement,
          Tooltip,
          Legend,
          LinearScale,
          PointElement,
          ChartDataLabels
        )
    );

  return (
    <div className="flex items-center justify-center">
      <BsClipboardDataFill
        onClick={() => setIsModalOpen(!isModalOpen)}
        size={20}
        className="inline-block cursor-pointer text-zinc-500 dark:text-zinc-400"
      />
      <Modal
        title={'Liked Strain Similarity'}
        open={isModalOpen}
        close={() => setIsModalOpen(!isModalOpen)}
        containerClasses="relative w-5/6 h-4/6 xl:w-1/2 md:w-2/3"
      >
        {isLoading || isFetching ? (
          <div
            role="status"
            className="flex items-center justify-center w-full h-full"
          >
            <svg
              aria-hidden="true"
              className="inline w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-700"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          likedStrainsData && (
            <Scatter
              height={'100%'}
              plugins={[ChartDataLabels, zoomPlugin]}
              // @ts-ignore
              options={options}
              updateMode="default"
              data={generateDatasetsFromData(likedStrainsData)}
            />
          )
        )}
      </Modal>
    </div>
  );
};

export default LikedStrainsModal;
