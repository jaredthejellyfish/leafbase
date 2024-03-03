'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { cn } from '@l/utils/cn';

// Define the response type for better type safety
type LikeResponse = {
  like: {
    id: string;
    created_at: string;
    user_id: string;
    strain_id: string;
  } | null;
};

async function getLikedStatus(strain_id: string): Promise<{ like: boolean }> {
  try {
    const res = await fetch(`/api/strains/is-liked?strain=${strain_id}`);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const like = (await res.json()) as LikeResponse;
    return like.like ? { like: true } : { like: false };
  } catch (error) {
    console.error('Failed to fetch liked status:', error);
    return { like: false };
  }
}

async function serverToggleLike(strain_id: string): Promise<void> {
  try {
    const res = await fetch(`/api/strains/toggle-like?strain=${strain_id}`);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Failed to toggle like:', error);
  }
}

// Define the Props interface for better type safety
interface Props {
  iconSize: number;
  liked: boolean;
  strain_id: string;
}

function LikeButton({ iconSize, liked, strain_id }: Props) {
  const padding = iconSize * 0.3;
  const [isLiked, setIsLiked] = useState(liked);

  const { data, refetch } = useQuery<{ like: boolean }>({
    queryKey: ['liked', strain_id],
    queryFn: () => getLikedStatus(strain_id),
    enabled: !!strain_id, // Only enable the query if strain_id is provided
    initialData: { like: liked },
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  const { mutate } = useMutation({
    mutationKey: ['liked', strain_id],
    mutationFn: () => serverToggleLike(strain_id),
    onSettled: async () => {
      await refetch();
    },
  });

  useEffect(() => {
    if (data.like !== undefined) {
      setIsLiked(!!data.like);
    }
  }, [data]);

  const toggleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLiked((liked) => !liked);
    mutate();
  };

  return (
    <button
      type="button"
      title="Like"
      aria-label={isLiked ? 'Unlike' : 'Like'} // Improve accessibility
      onClick={(e) => toggleLike(e)}
      className={cn(
        'rounded-full border bg-zinc-800 z-50 dark:border-zinc-400 border-zinc-500 dark:text-zinc-400 text-zinc-500 flex items-center justify-center transition-colors duration-200 focus:outline-none',
        isLiked &&
          'border-green-700 text-green-700 dark:border-green-700 dark:text-green-700',
      )}
      style={{ padding: `${padding}px` }} // Use inline styles for dynamic padding
    >
      <FaHeart
        size={iconSize}
        className={cn('scale-100 transition-all', !isLiked && 'scale-0 hidden')}
      />
      <FaRegHeart
        size={iconSize}
        className={cn('scale-100 transition-all', isLiked && 'scale-0 hidden')}
      />
    </button>
  );
}

export default LikeButton;
