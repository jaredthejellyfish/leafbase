'use client';

import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@c/ui/dropdown-menu';
import dynamic from 'next/dynamic';

const SuggestedPairingsModal = dynamic(() => import('./SuggestedPairingsModal'), {ssr: false});

type Props = {
  id: string;
  slug: string;
};

function StrainSuggestions({ id, slug }: Props) {
  const [suggestedPairingsOpen, setSuggestedPairingsOpen] = useState(false);
  const [customPairingsOpen, setCustomPairingsOpen] = useState(false);
  const queryClient = useQueryClient();
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <FiMoreVertical
            className="cursor-pointer hover:bg-slate-400/10 p-1 rounded-md transition-colors"
            size={32}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Pairings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              await queryClient.invalidateQueries({
                queryKey: ['pairings', slug, id],
              });
              setSuggestedPairingsOpen(!suggestedPairingsOpen);
            }}
          >
            Suggested Pairings
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setCustomPairingsOpen(!customPairingsOpen)}
          >
            Custom Pairing
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {setSuggestedPairingsOpen && (
        <SuggestedPairingsModal
          open={suggestedPairingsOpen}
          setOpen={setSuggestedPairingsOpen}
          slug={slug}
          id={id}
        />
      )}
      {/*
      <CustomPairingsModal
        open={customPairingsOpen}
        setOpen={setCustomPairingsOpen}
        image={image}
        slug={slug}
        id={id}
      /> */}
    </>
  );
}

export default StrainSuggestions;
