'use client';

import type { Context } from 'chartjs-plugin-datalabels';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useQuery } from '@tanstack/react-query';
import { BsClipboardFill } from 'react-icons/bs';
import { Clipboard } from 'lucide-react';
import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import type { Align } from 'chart.js';
import dynamic from 'next/dynamic';

import Modal from '../Modal';

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

  return { datasets: datasets };
}

function LikedStrainsModal() {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  const { data: likedCoords, isFetching } = useQuery({
    queryKey: ['liked-plot'],
    queryFn: () => fetchLikedStrainsPCA(),
    enabled: open,
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

  return (
    <>
      <button onClick={() => setOpen(!open)}>
        {!open ? <BsClipboardFill /> : <Clipboard />}
      </button>
      <Modal
        title="Liked Strains Similarity"
        open={open}
        setOpen={setOpen}
        containerClass="sm:max-w-[64%]"
      >
        {!isFetching && likedCoords ? (
          <div style={{ width: '60vw', height: '60vh' }}>
            {/* @ts-expect-error - wrong types in plugin config cant fix it */}
            <DynamicScatter data={likedCoords} options={options} />
          </div>
        ) : null}
      </Modal>
    </>
  );
}

export default LikedStrainsModal;
