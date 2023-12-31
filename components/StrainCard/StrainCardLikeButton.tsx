'use client';

import { motion } from 'framer-motion';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { likeStrain } from '@/lib/actions/likeStrain';
import { cn } from '@/lib/utils';

import React, { useEffect, useOptimistic, useTransition } from 'react';

type Props = {
  liked: boolean;
  id: string;
  className?: string;
  width?: number;
  height?: number;
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

const StrainCardLikeButton = (props: Props) => {
  const [isPending, startTransition] = useTransition();

  const [optimisticLike, setOptimisticLike] = useOptimistic(
    props.liked || false, // Default to 0 likes if null
    (state) => !state,
  );

  useEffect(() => {
    startTransition(() => {
      setOptimisticLike(props.liked);
    });
  }, [props.liked, setOptimisticLike]);

  function handleClick() {
    startTransition(() => {
      setOptimisticLike(!optimisticLike);
      likeStrain(!optimisticLike, props.id);
    });
  }

  return (
    <motion.button
      aria-label="Like Strain"
      className={cn(
        `absolute right-2 top-1.5 z-50 rounded-full border bg-white p-1.5 text-zinc-400/75 transition-colors dark:bg-zinc-800 dark:text-zinc-400 ${
          optimisticLike ? 'border-green-600/40' : 'dark:border-zinc-700'
        }`,
        props.className,
      )}
      variants={likeButtonVariants}
      whileHover="hover"
      initial="initial"
      animate={optimisticLike ? 'like' : 'initial'}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleClick();
      }}
      disabled={isPending}
    >
      {optimisticLike ? (
        <AiFillHeart
          style={{ width: props.width, height: props.height }}
          className="text-green-600/75"
        />
      ) : (
        <AiOutlineHeart style={{ width: props.width, height: props.height }} />
      )}
    </motion.button>
  );
};

export default StrainCardLikeButton;
