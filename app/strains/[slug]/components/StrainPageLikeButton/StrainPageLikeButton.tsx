'use client';

import React, { useState, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { Strain } from '@prisma/client';
import { StrainExtended } from '@/types/interfaces';

type Props = {
  id: string;
  className?: string;
};

const getLikedStatus = async (id: string) => {
  const response = await fetch('/api/strains/liked');
  const data = (await response.json()) as { strains: StrainExtended[] };
  return data.strains.map((strain: Strain) => strain.id).includes(id);
};

const StrainPageLikeButton = (props: Props) => {
  const [liked, setLiked] = useState(false);
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['liked-status', props.id],
    queryFn: () => getLikedStatus(props.id),
    enabled: !!session?.user,
    cacheTime: 0,
  });

  useEffect(() => {
    if (data) {
      setLiked(data);
    }
  }, [data]);

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
      queryClient.invalidateQueries(['liked-status', props.id]);
    },
  });
  const { mutate: removeLike } = useMutation(unlikeStrain, {
    onSuccess: () => {
      queryClient.invalidateQueries(['liked-status', props.id]);
    },
  });

  const handleLike = () => {
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
      className={` border bg-white dark:bg-zinc-800 text-zinc-400/75 transition-colors rounded-full p-1.5 dark:text-zinc-400 ${
        props.className
      } ${liked ? 'border-green-600/40' : 'dark:border-zinc-700'}`}
      onClick={() => handleLike()}
      variants={likeButtonVariants}
      whileHover="hover"
      initial="initial"
      onTap={() => setLiked(!liked)}
      animate={liked ? 'like' : 'initial'}
    >
      {liked ? (
        <AiFillHeart className="text-green-600/75" size={23} />
      ) : (
        <AiOutlineHeart size={23} />
      )}
    </motion.button>
  );
};

export default StrainPageLikeButton;
