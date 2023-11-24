'use client';

import { BsClipboardFill, BsClipboardX } from 'react-icons/bs';
import type { Context } from 'chartjs-plugin-datalabels';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import type { Align } from 'chart.js';
import dynamic from 'next/dynamic';

import { toast } from '../ui/use-toast';

const Modal = dynamic(() => import('../Modal'), { ssr: false });
const DynamicScatter = dynamic(
  () => import('react-chartjs-2').then((mod) => mod.Scatter),
  { ssr: false }
);

async function fetchLikedStrainsPCA() {
  const response = await fetch(`/api/generate/pca`);
  const data = (await response.json()) as {
    pca: {
      x: number;
      y: number;
      label: string;
    }[];
  };
  const pcaData = data.pca || [];

  if (pcaData.length === 0) {
    toast({
      title: 'No liked strains',
      description: 'You have not liked any strains yet!',
    });
    return null;
  }

  return {
    datasets: pcaData.map((point) => ({
      label: point.label || 'Unknown',
      data: [{ x: point.x, y: point.y }],
      backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 1)`,
      pointRadius: 5,
    })),
  };
}

function StrainSimilarityModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const { theme } = useTheme();
  const {
    data: likedCoords,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['liked-plot'],
    queryFn: fetchLikedStrainsPCA,
    enabled: false, // Do not run automatically
  });

  const options = {
    maintainAspectRatio: false,
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
        formatter: (
          value: { x: number; y: number; label: string },
          context: Context
        ) => {
          return context.dataset.label;
        },
        display: true,
        color: theme === 'dark' ? 'white' : 'black',
        align: 'right' as Align,
        offset: 8,
      },
      legend: {
        display: false,
      },
    },
  };

  const handleButtonClick = async () => {
    if (!isFetching && !likedCoords) {
      await refetch();
    }
    setModalOpen(true);
  };
  return (
    <>
      <button onClick={handleButtonClick} disabled={isFetching || isError}>
        {!isError && !isFetching && <BsClipboardFill className="h-5 w-5" />}
        {isError && <BsClipboardX className="h-5 w-5" />}
        {isFetching && (
          <BsClipboardFill className="text-gradient-to-br h-5 w-5 animate-pulse from-gray-200 via-green-300 to-green-700" />
        )}
      </button>
      {modalOpen && likedCoords && (
        <Modal
          title="Liked Strains Similarity"
          open={modalOpen}
          setOpen={setModalOpen}
          containerClass="sm:max-w-[64%]"
        >
          <div className={'h-[60vh] w-[82vw] sm:w-[60vw]'}>
            {/* @ts-expect-error - config for plugin has incorrect type def */}
            <DynamicScatter data={likedCoords} options={options} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default StrainSimilarityModal;
