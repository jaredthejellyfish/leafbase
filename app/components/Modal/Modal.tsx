'use client';

import { motion } from 'framer-motion';
import React, { useRef } from 'react';

type Props = {
  title?: string;
  children: React.ReactNode;
  containerClasses?: string;
  open: boolean;
  close: () => void;
};

const Modal = (props: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    props.open && (
      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          ref={dropdownRef}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.2,
            },
          }}
          className="fixed left-0 z-10 flex items-center justify-center w-full h-full top-8 sm:top-0 bg-black/60"
        >
          <div
            className={`relative flex flex-col w-full px-8 py-4 mx-3 bg-white sm:px-10 rounded-xl dark:bg-zinc-900 ${props.containerClasses}`}
          >
            <div className="flex flex-row items-center justify-between mb-4 text-xl font-bold">
              <h1 className="text-xl">{props.title}</h1>
              <button
                onClick={() => props.close()}
                className="p-1 transition-all rounded-full dark:text-white hover:bg-zinc-400 dark:hover:bg-zinc-600 focus:outline-none"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="relative w-full h-full">{props.children}</div>
          </div>
        </motion.div>
      </div>
    )
  );
};

export default Modal;
