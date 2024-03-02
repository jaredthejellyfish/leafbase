'use client';

import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { TbGraphFilled, TbGraphOff } from 'react-icons/tb';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@c/ui/tooltip';

import Modal from '../Modal';
import ScatterPlot from './ScatterPlot';

async function fetchLikedStrainsPCA() {
  const response = await fetch(`/api/graph/pca`);
  const data = (await response.json()) as {
    pca: {
      x: number;
      y: number;
      label: string;
    }[];
  };
  const pcaData = data.pca || [];

  if (pcaData.length === 0) {
    return null;
  }

  return pcaData.map((point) => ({
    x: point.x,
    y: point.y,
    label: point.label,
    size: 7,
  }));
}

function StrainSimilarityModal() {
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data: likedCoords,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['liked-plot'],
    queryFn: fetchLikedStrainsPCA,
    enabled: modalOpen,
  });

  const handleButtonClick = async () => {
    setModalOpen(!modalOpen);
    if (!isFetching && !likedCoords) {
      await refetch();
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              className="flex items-center justify-center"
              onClick={
                isFetching || isError
                  ? () => {
                      alert('not loaded pal, sorry :)');
                    }
                  : handleButtonClick
              }
            >
              <GraphIcon isFetching={isFetching} isError={isError} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-semibold">Strain Similarity</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Modal
        title={`Liked Strains Similarityㅤ(${
          likedCoords ? likedCoords.length : '--'
        })`}
        open={modalOpen}
        setOpen={setModalOpen}
        containerClass="sm:max-w-[64%]"
      >
        <div className={'h-[60vh] w-[82vw] sm:w-[60vw]'}>
          <ScatterPlot data={likedCoords} />
        </div>
      </Modal>
    </>
  );
}

function GraphIcon({
  isFetching,
  isError,
}: {
  isFetching: boolean;
  isError: boolean;
}) {
  if (isFetching) {
    return (
      <TbGraphFilled className="text-gradient-to-br size-6 animate-pulse from-gray-200 via-green-300 to-green-700" />
    );
  }
  if (isError) {
    return <TbGraphOff className="size-6 text-red-500" />;
  }
  return <TbGraphFilled className="size-6" />;
}

export default StrainSimilarityModal;
