import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';

const CommentLikeButtonLoading = () => {
  return (
    <button
      aria-label="Like Strain"
      className={
        'absolute top-1.5 right-2 border bg-white dark:bg-zinc-800 text-zinc-400/75 transition-colors rounded-full p-1.5 dark:text-zinc-400 dark:border-zinc-700'
      }
    >
      <AiOutlineHeart />
    </button>
  );
};

export default CommentLikeButtonLoading;
