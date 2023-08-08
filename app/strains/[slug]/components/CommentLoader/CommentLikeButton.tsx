'use client';

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Props = {
  liked: boolean | undefined;
  id: string | undefined;
  className?: string;
};

const CommentLikeButton = (props: Props) => {
  const { liked: likedProp, id } = props;
  const [liked, setLiked] = useState(likedProp);

  useEffect(() => {
    setLiked(liked);
  }, [liked]);

  const likeDispensaryComment = async () => {
    await fetch('/api/strains/comment/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ commentId: id }),
    });
  };

  const unlikeDispensaryComment = async () => {
    await fetch('/api/strains/comment/unlike', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ commentId: id }),
    });
  };

  const { mutate: addLike } = useMutation(likeDispensaryComment, {
    onSuccess: () => {
      setLiked(!liked);
    },
  });
  const { mutate: removeLike } = useMutation(unlikeDispensaryComment, {
    onSuccess: () => {
      setLiked(!liked);
    },
  });

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (liked) {
      removeLike();
    } else {
      addLike();
    }
  };

  const likeButtonVariants = {
    initial: {
      scale: 1,
      rotate: 0,
    },
    hover: {
      scale: 1.05,
      rotate: [-25, 0, 25, 0, -25],
      transition: {
        scale: { duration: 0.2 },
        rotate: { duration: 1.15, repeat: Infinity, delay: 0.2 },
      },
    },
    like: {
      rotate: [0, 360],
      transition: {
        rotate: { duration: 0.3 },
      },
    },
  };

  return (
    <motion.button
      aria-label="Like Strain"
      className={`z-40 absolute top-2.5 right-36 border bg-white dark:bg-zinc-800 text-zinc-400/75 transition-colors rounded-full p-1.5 dark:text-zinc-400 ${
        liked ? 'border-green-600/40' : 'dark:border-zinc-700'
      }`}
      onClick={(e) => handleLike(e)}
      variants={likeButtonVariants}
      whileHover="hover"
      initial="initial"
      animate={liked ? 'like' : 'initial'}
    >
      {liked ? (
        <AiFillHeart className="text-green-600/75" />
      ) : (
        <AiOutlineHeart />
      )}
    </motion.button>
  );
};

export default CommentLikeButton;
