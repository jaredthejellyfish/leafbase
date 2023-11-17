'use client';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import Modal from '../Modal';

const DynamicScatter = dynamic(
  () => import('react-chartjs-2').then((mod) => mod.Scatter),
  { ssr: false } // Set to true if server-side rendering is required and the module supports it
);

async function fetchLikedStrainsPCA() {
  const response = await fetch(`/api/generate/pca`);
  const data = (await response.json()) as {
    pca: {
      x: number;
      y: number;
    };
  };

  const properData = {
    datasets: [
      {
        label: 'PCA Scatter Plot',
        data: data.pca,
        backgroundColor: 'rgba(255, 99, 132, 1)',
        pointRadius: 5, // Optional for styling
      },
    ],
  };
  return properData;
}

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // Set to true if you want to display a legend
    },
  },
};

// ... (rest of your imports and code)

function LikedStrainsModal() {
  const [open, setOpen] = useState(false);

  const { data: likedCoords, isFetching } = useQuery({
    queryKey: ['liked-plot'],
    queryFn: () => fetchLikedStrainsPCA(),
    enabled: open,
  });

  if (open === true)
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
    <>
      <button onClick={() => setOpen(!open)}>{open ? 'close' : 'open'}</button>
      <Modal
        title="Liked Strains Similarity"
        open={open}
        setOpen={setOpen}
        containerClass="sm:max-w-[64%]"
      >
        {isFetching ? (
          'fetching...'
        ) : likedCoords ? (
          <div style={{ width: '60vw', height: '60vh' }}>
            <DynamicScatter data={likedCoords} options={options} />
          </div>
        ) : null}
      </Modal>
    </>
  );
}

export default LikedStrainsModal;
