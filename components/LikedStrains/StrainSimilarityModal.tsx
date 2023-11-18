'use client';

import { BsClipboardFill, BsClipboardX } from 'react-icons/bs';
import type { Context } from 'chartjs-plugin-datalabels';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useQuery } from '@tanstack/react-query';
import { Clipboard } from 'lucide-react';
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

async function fetchLikedStrainsPCA(
  errorSetter: React.Dispatch<React.SetStateAction<boolean>>,
  openSetter: React.Dispatch<React.SetStateAction<boolean>>,
  shouldFetchSetter: React.Dispatch<React.SetStateAction<boolean>>
) {
  const response = await fetch(`/api/generate/pca`);
  const data = (await response.json()) as {
    pca: {
      x: number;
      y: number;
      label: string;
    }[];
  };

  if (!data.pca) {
    return null;
  }

  const datasets = data.pca.map((point) => ({
    label: point.label || 'Unknown',
    data: [{ x: point.x, y: point.y }],
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 1)`,
    pointRadius: 5,
  }));

  if (datasets.length < 1) {
    toast({
      title: 'No liked strains',
      description: 'You have not liked any strains yet!',
    });
    errorSetter(true);
    openSetter(false);
    shouldFetchSetter(false);
    return null;
  }

  shouldFetchSetter(false);
  openSetter(true);
  errorSetter(false);

  return { datasets: datasets };
}

function StrainSimilarityModal() {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const { theme } = useTheme();

  const { data: likedCoords, isFetching } = useQuery({
    // eslint-disable-next-line
    queryKey: ['liked-plot'],
    queryFn: () => fetchLikedStrainsPCA(setError, setOpen, setShouldFetch),
    enabled: shouldFetch,
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
        formatter: function (
          value: { x: number; y: number; label: string },
          context: Context
        ) {
          return context.dataset.label;
        },
        display: true,
        color: theme === 'dark' ? 'white' : 'black',
        align: 'right' as Align,
        offset: 8,
      },
      legend: {
        display: false,
        labels: {
          usePointStyle: true,
        },
      },
    },
  };

  if (open === true && typeof window !== 'undefined') {
    import('chartjs-plugin-zoom').then((zoomModule) => {
      const zoomPlugin = zoomModule.default;
      import('chart.js').then(
        ({ Chart, ArcElement, Tooltip, Legend, LinearScale, PointElement }) => {
          Chart.register(
            ArcElement,
            Tooltip,
            Legend,
            LinearScale,
            PointElement,
            ChartDataLabels,
            zoomPlugin
          );
        }
      );
    });
  }

  function handleClick() {
    if (likedCoords && likedCoords.datasets.length > 1) {
      setOpen(true);
      return;
    }

    setShouldFetch(true);
  }

  return (
    <>
      <button onClick={() => handleClick()} disabled={isFetching || error}>
        {!error && (!open ? <BsClipboardFill /> : <Clipboard />)}
        {error && <BsClipboardX />}
      </button>
      {likedCoords && likedCoords.datasets.length > 1 && (
        <Modal
          title="Liked Strains Similarity"
          open={open}
          setOpen={setOpen}
          containerClass="sm:max-w-[64%]"
        >
          {!isFetching && likedCoords ? (
            <div className={"w-[82vw] sm:w-[60vw] h-[60vh]"}>
              {/* @ts-expect-error - wrong types in plugin config cant fix it */}
              <DynamicScatter data={likedCoords} options={options} />
            </div>
          ) : null}
        </Modal>
      )}
    </>
  );
}

export default StrainSimilarityModal;
