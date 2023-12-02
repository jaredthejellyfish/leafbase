'use client';

import React, { startTransition, useOptimistic } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { usePathname } from 'next/navigation';

import { likeComment } from '@/lib/actions/comment/like';

type Props = { comment_id: string; isLiked: boolean };

function LikeCommentButton({ comment_id, isLiked }: Props) {
  const pathname = usePathname();
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(
    isLiked || false,
    (state) => {
      return !state;
    }
  );

  const strainSlug = pathname.split('/').pop();

  async function handleClick() {
    startTransition(() => {
      if (!strainSlug) return;
      setOptimisticLiked(!optimisticLiked);
      likeComment(comment_id, strainSlug);
    });
  }

  return (
    <button onClick={handleClick}>
      {optimisticLiked ? (
        <BsHeartFill className="h-5 w-5 text-green-700" />
      ) : (
        <BsHeart className="h-5 w-5" />
      )}
    </button>
  );
}

export default LikeCommentButton;
