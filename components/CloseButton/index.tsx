'use client';

import { AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
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
      <AiOutlineClose size={20} className="absolute top-6 right-6" />
    </button>
  );
}

export default CloseButton;
