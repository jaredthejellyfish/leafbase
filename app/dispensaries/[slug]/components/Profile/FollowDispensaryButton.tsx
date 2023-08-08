'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AiFillBell, AiOutlineBell } from 'react-icons/ai';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Dispensary } from '@prisma/client';
import { motion } from 'framer-motion';

type Props = { dispensaryId: string };

const followDispensary = async (dispensaryId: string) => {
  const response = await fetch('/api/dispensaries/follow', {
    method: 'POST',
    body: JSON.stringify({ dispensaryId }),
  });
  const data = await response.json();
  fetch('/api/email/dispensary/subscribed', {
    method: 'POST',
    body: JSON.stringify({
      dispensaryId,
    }),
  })
    .then(() => console.log('sent email'))
    .catch((err) => console.error(err));
  return data;
};

const unfollowDispensary = async (dispensaryId: string) => {
  const response = await fetch('/api/dispensaries/unfollow', {
    method: 'POST',
    body: JSON.stringify({ dispensaryId }),
  });
  const data = await response.json();
  return data;
};

const getFollowedStatus = async (dispensaryId: string) => {
  const response = await fetch('/api/dispensaries/followed');
  const data = (await response.json()) as { dispensaries: Dispensary[] };

  if (data.dispensaries.length < 1) return false;

  const followed = data.dispensaries
    .map((dispensary) => dispensary.id)
    .includes(dispensaryId);

  return followed;
};

const FollowDispensaryButton = (props: Props) => {
  const { dispensaryId } = props;
  const [followed, setFollowed] = useState(false);
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { mutate: follow } = useMutation(() => followDispensary(dispensaryId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['followed-status', dispensaryId]);
    },
  });

  const { mutate: unfollow } = useMutation(
    () => unfollowDispensary(dispensaryId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['followed-status', dispensaryId]);
      },
    }
  );

  const { data } = useQuery({
    queryKey: ['followed-status', dispensaryId],
    queryFn: () => getFollowedStatus(dispensaryId),
    enabled: !!session?.user,
    cacheTime: 30000,
  });

  useEffect(() => {
    if (data) {
      setFollowed(data);
    }
  }, [data]);

  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (followed) {
      unfollow();
      setFollowed(false);
    } else {
      follow();
      setFollowed(true);
    }
  };

  const bellVariants = {
    followed: {
      scale: [1, 1.05, 1],
      rotate: [0, 10, -10, 10, -10, 0],
      x: [0, -1, 1, -1, 1, 0], // This will make the bell swing side to side
      transition: {
        duration: 0.8,
      },
    },
    initial: {
      scale: [1, 0.9, 1],
      rotate: [0, 10, -10, 10, -10, 0],
      x: [0, -1, 1, -1, 1, 0], // This will make the bell swing side to side
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    !!session?.user && (
      <button
        className={`absolute top-3 right-4 rounded-full text-sm p-1.5 border  ${
          followed
            ? 'text-green-700 border-green-600'
            : 'border-zinc-400 text-zinc-400 '
        }`}
        onClick={(e) => handleFollow(e)}
      >
        <motion.div
          variants={bellVariants}
          animate={followed ? 'followed' : 'initial'}
        >
          {!followed ? <AiOutlineBell size={18} /> : <AiFillBell size={18} />}
        </motion.div>
      </button>
    )
  );
};

export default FollowDispensaryButton;
