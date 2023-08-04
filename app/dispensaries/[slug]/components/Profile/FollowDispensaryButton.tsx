import { Dispensary } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { AiFillBell, AiOutlineBell } from 'react-icons/ai';

type Props = { dispensaryId: string };

const followDispensary = async (dispensaryId: string) => {
  const response = await fetch('/api/dispensaries/follow', {
    method: 'POST',
    body: JSON.stringify({ dispensaryId }),
  });
  const data = await response.json();
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

const gerFollowedStatus = async (dispensaryId: string) => {
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
    queryFn: () => gerFollowedStatus(dispensaryId),
    enabled: !!session?.user,
    cacheTime: 30000,
  });

  useEffect(() => {
    console.log('data', data);
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

  return (
    !!session?.user && (
      <button
        className={`absolute top-3 right-4 rounded text-sm ${
          followed
            ? 'text-green-700'
            : 'text-zinc-400 '
        }`}
        onClick={(e) => handleFollow(e)}
      >
        {!followed ? <AiOutlineBell size={23} /> : <AiFillBell size={23} />}
      </button>
    )
  );
};

export default FollowDispensaryButton;
