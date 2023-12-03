'use client';

import { FiMoreVertical } from 'react-icons/fi';
import React, { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SuggestedPairingsModal from '../SuggestedPairingsModal';
import CustomPairingsModal from '../CustomPairingsModal';

type Props = {
  id: string;
  slug: string;
  image: string;
};

function StrainSuggestionsButton({ slug, id, image }: Props) {
  const [suggestedPairingsOpen, setSuggestedPairingsOpen] = useState(false);
  const [customPairingsOpen, setCustomPairingsOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <FiMoreVertical className="cursor-pointer" size={25} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Pairings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setSuggestedPairingsOpen(!suggestedPairingsOpen)}
          >
            Suggested Pairings
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setCustomPairingsOpen(!customPairingsOpen)}
          >
            Custom Pairing
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Tools</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => alert('This feature is not yet implemented')}
          >
            Smoke Timer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SuggestedPairingsModal
        open={suggestedPairingsOpen}
        setOpen={setSuggestedPairingsOpen}
        slug={slug}
        id={id}
      />
      <CustomPairingsModal
        open={customPairingsOpen}
        setOpen={setCustomPairingsOpen}
        image={image}
        slug={slug}
        id={id}
      />
    </>
  );
}

export default StrainSuggestionsButton;
