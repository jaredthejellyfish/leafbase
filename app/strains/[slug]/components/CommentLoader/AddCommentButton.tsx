'use client';

import { StrainExtended } from '@/types/interfaces';
import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import TextareaAutosize from 'react-textarea-autosize';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

type Props = { strain: StrainExtended };

function AddCommentButton(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);
  const strainId = props.strain.id;
  const router = useRouter();

  const addComment = async (content: string, strainId: string) => {
    if (content.length < 1) return;
    setIsSaving(true);
    const res = await fetch('/api/strains/comment/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, strainId }),
    });
    if (res.status === 200) {
      router.refresh();
      setComment('');
      setIsSaving(false);
      setIsModalOpen(false);
    } else {
      setComment('');
      setIsSaving(false);
      setIsError(true);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <button
        className="flex flex-row gap-2 p-2 text-green-700 transition scale-90 border border-green-700 rounded-lg sm:p-2 sm:px-2 sm:pr-3 md:scale-100 hover:bg-green-700 hover:text-white hover:dark:bg-zinc-500 hover:dark:text-zinc-200 text-md dark:border-zinc-500 dark:text-zinc-400 w-fit"
        onClick={() => setIsModalOpen(!isModalOpen)}
        data-testid="add-comment-button"
      >
        <AiOutlinePlus size={25} />
        <span className="hidden sm:block">Add Comment</span>
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen p-0 px-4 pt-4 pb-20 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.2,
                  },
                }}
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 opacity-80 bg-zinc-700/75 dark:bg-zinc-900"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0,
                  transition: {
                    duration: 0.2,
                  },
                }}
                className="z-30 inline-block w-full max-w-lg overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl dark:bg-zinc-800"
              >
                <div className="flex flex-row items-center justify-between pt-3 px-7 dark:bg-zinc-800">
                  <p className="text-xl font-semibold">Add a comment:</p>
                  <button
                    data-testid="close-comment-modal"
                    onClick={() => setIsModalOpen(false)}
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
                <div className="flex px-6 pt-2 pb-3 dark:bg-zinc-800">
                  <TextareaAutosize
                    className="w-full p-2 border rounded border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-300"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    minRows={4}
                  ></TextareaAutosize>
                </div>
                <div className="flex items-center justify-center px-6 dark:bg-zinc-800">
                  <button
                    aria-label="Save"
                    type="button"
                    className="w-1/2 mb-4 mt-2 text-green-700 border border-green-700 dark:text-white hover:text-white hover:bg-green-800 transition-all focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 mr-2 dark:bg-green-700 dark:hover:bg-green-800 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() => addComment(comment, strainId)}
                    disabled={isSaving}
                    data-testid="save-comment-button"
                  >
                    {isSaving && !isError ? 'Saving...' : 'Save'}
                    {isError && 'Error'}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AddCommentButton;
