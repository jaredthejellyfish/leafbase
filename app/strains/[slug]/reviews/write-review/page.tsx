'use client';
import React, { useState } from 'react';

import Modal from '@/components/Modal';

function WriteReview() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Write a review</button>
      <Modal open={isOpen} setOpen={setIsOpen} noTitle>
        <p>Hi!</p>
      </Modal>
    </>
  );
}

export default WriteReview;
