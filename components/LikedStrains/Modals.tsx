'use client';

import { BsClipboardFill, BsClipboardX } from 'react-icons/bs';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ErrorBoundary } from 'react-error-boundary';
import { MdError } from 'react-icons/md';
import React, { useEffect } from 'react';
import { PieChart } from 'lucide-react';
import dynamic from 'next/dynamic';

const StrainSimilarityModal = dynamic(() => import('./StrainSimilarityModal'), {
  ssr: false,
  loading: () => (
    <BsClipboardFill className="text-gradient-to-br h-5 w-5 animate-pulse from-gray-200 via-green-300 to-green-700" />
  ),
});
const SmokingProfileModal = dynamic(() => import('./SmokingProfileModal'), {
  ssr: false,
  loading: () => (
    <PieChart className="text-gradient-to-br animate-pulse from-gray-200 via-green-300 to-green-700" />
  ),
});

type Props = { modal: boolean };

function Modals({ modal }: Props) {
  useEffect(() => {
    if (modal) {
      import('chartjs-plugin-zoom').then((zoomModule) => {
        const zoomPlugin = zoomModule.default;
        import('chart.js').then(
          ({
            Chart,
            ArcElement,
            Tooltip,
            Legend,
            LinearScale,
            PointElement,
          }) => {
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
  }, [modal]);

  if (!modal) return null;

  return (
    <>
      <ErrorBoundary fallback={<BsClipboardX className="h-5 w-5" />}>
        <StrainSimilarityModal />
      </ErrorBoundary>
      <ErrorBoundary fallback={<MdError className="h-6 w-6" />}>
        <SmokingProfileModal />
      </ErrorBoundary>
    </>
  );
}

export default Modals;
