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
    <BsClipboardFill className="w-5 h-5 text-gradient-to-br from-gray-200 via-green-300 to-green-700 animate-pulse" />
  ),
});
const SmokingProfileModal = dynamic(() => import('./SmokingProfileModal'), {
  ssr: false,
  loading: () => (
    <PieChart className="text-gradient-to-br from-gray-200 via-green-300 to-green-700 animate-pulse" />
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
      <ErrorBoundary fallback={<BsClipboardX className="w-5 h-5" />}>
        <StrainSimilarityModal />
      </ErrorBoundary>
      <ErrorBoundary fallback={<MdError className="w-6 h-6" />}>
        <SmokingProfileModal />
      </ErrorBoundary>
    </>
  );
}

export default Modals;
