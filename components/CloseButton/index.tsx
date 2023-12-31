'use client';

import { useRouter } from 'next/navigation';
import { AiOutlineClose } from 'react-icons/ai';

import React from 'react';

function CloseButton() {
  const router = useRouter();

  function preventDefault(event: React.SyntheticEvent) {
    event.preventDefault();
    event.stopPropagation();
    router.back();
  }

  return (
    <button
      type="submit"
      aria-label="Stop editing"
      onClick={(e) => preventDefault(e)}
    >
      <AiOutlineClose size={20} className="absolute right-6 top-6" />
    </button>
  );
}

export default CloseButton;
