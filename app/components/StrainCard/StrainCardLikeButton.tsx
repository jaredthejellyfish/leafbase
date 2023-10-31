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

const StrainCardLikeButton = (props: Props) => {
  const [liked, setLiked] = useState(props.liked);

  useEffect(() => {
    setLiked(props.liked);
  }, [props.liked]);

  const likeStrain = async () => {
    await fetch('/api/strains/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ strainId: props.id }),
    });
  };

  const unlikeStrain = async () => {
    await fetch('/api/strains/unlike', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ strainId: props.id }),
    });
  };

  const { mutate: addLike } = useMutation(likeStrain, {
    onSuccess: () => {
      setLiked(true);
    },
  });
  const { mutate: removeLike } = useMutation(unlikeStrain, {
    onSuccess: () => {
      setLiked(false);
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
      className={`absolute top-1.5 right-2 border bg-white dark:bg-zinc-800 text-zinc-400/75 transition-colors rounded-full p-1.5 dark:text-zinc-400 ${
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

export default StrainCardLikeButton;