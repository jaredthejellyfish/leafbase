'use client';

import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useOnClickOutside } from 'usehooks-ts';
import { LazyMotion, m } from 'framer-motion'; //changed motion to m and imported LazyMotion, domAnimation

import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  containerClass?: string;
  onModalClose?: () => void;
};

const variants = {
  background: {
    visible: { opacity: 1, display: 'flex' },
    hidden: {
      opacity: 0,
      transition: {
        delay: 0.3,
        display: {
          delay: 0.6,
        },
      },
      display: 'none',
    },
  },
  modal: {
    visible: { opacity: 1, scale: 1, display: 'block' },
    hidden: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.3,
        display: {
          delay: 0.4,
        },
      },
      display: 'none',
    },
  },
};

function Modal({
  children,
  open,
  setOpen,
  title,
  containerClass,
  onModalClose,
}: Props) {
  const [isOpen, setIsOpen] = useState(open);
  const ref = React.useRef<HTMLDivElement | null>(null);

  function handleClickOutside() {
    setIsOpen(false);
    if (setOpen) setOpen(false);
  }

  useOnClickOutside(ref, handleClickOutside);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isOpen && event.key === 'Escape') {
        setIsOpen(false);
        if (setOpen) setOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, setOpen]);

  function handdleClose() {
    setIsOpen(false);
    if (onModalClose) onModalClose();
    if (setOpen) setOpen(false);
  }

  return (
    <LazyMotion
      features={() => import('framer-motion').then((res) => res.domAnimation)}
    >
      <m.div
        variants={variants.background}
        animate={isOpen ? 'visible' : 'hidden'}
        initial="hidden"
        className="fixed top-0 w-full h-screen z-50 px-6 bg-zinc-900/75 overflow-y-hidden flex items-center justify-center border-transparent right-0 left-0 bottom-0"
      >
        <m.div
          variants={variants.modal}
          animate={isOpen ? 'visible' : 'hidden'}
          initial="hidden"
          ref={ref}
          className={cn(
            'dark:bg-zinc-800 z-50 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full sm:max-w-lg sm:w-full border-transparent relative',
            containerClass || ''
          )}
        >
          <div className="w-full flex flex-row justify-between items-center dark:bg-zinc-950/40 bg-zinc-200 px-4 py-2">
            <h2 className="text-lg font-semibold mt-0.5">{title}</h2>
            <button onClick={() => handdleClose()}>
              <AiOutlineClose size={20} />
            </button>
          </div>
          <div className="px-4 py-2">{children}</div>
        </m.div>
      </m.div>
    </LazyMotion>
  );
}

export default Modal;
