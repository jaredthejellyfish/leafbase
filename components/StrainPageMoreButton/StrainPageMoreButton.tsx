'use client';

import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('@/components/Modal/Modal'), { ssr: false });

const StrainPageMoreButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button className="text-zinc-400/75 transition-colors rounded-full p-1.5 dark:text-zinc-400">
        <FiMoreVertical size={25} />
      </button>
      <Modal
        title={'Hello world!'}
        containerClasses={''}
        open={isModalOpen}
        close={() => setIsModalOpen(!isModalOpen)}
      >
        <p>Child!</p>
      </Modal>
    </>
  );
};

export default StrainPageMoreButton;
