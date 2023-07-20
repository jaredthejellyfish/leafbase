import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Dispensary } from '@prisma/client';
import useServerUser from '@/hooks/useServerUser';

import dynamic from 'next/dynamic';
import CommentLikeButtonLoading from './ComentLikeButtonLoading';

type Props = {
  dispensary: Dispensary;
};

const CommentLikeButton = dynamic(() => import('./CommentLikeButton'), {
  loading: () => <CommentLikeButtonLoading />,
});

const getComments = async (dispensary: Dispensary, userId: string) => {
  try {
    const comments = await prisma.dispensaryComment.findMany({
      where: {
        dispensaryId: dispensary.id,
      },
      include: {
        likes: {
          where: {
            userId: userId,
          },
        },
        user: {
          select: {
            displayName: true,
          },
        },
      },
    });

    return { comments: comments, error: null };
  } catch (error) {
    console.log(error);
    return { comments: null, error: error };
  }
};

const Comments = async (props: Props) => {
  const { dispensary } = props;
  const user = await useServerUser();

  const { comments, error } = await getComments(dispensary, user?.id as string);

  if (error || !comments) return <div>Error</div>;

  return comments?.length && comments?.length > 0 ? (
    <div className="relative z-0 flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
      <h1 className="text-xl font-bold">Top Comments</h1>
      <div className="flex flex-col gap-3 mt-2">
        {comments &&
          comments?.length > 0 &&
          comments?.map((comment) => (
            <Link
              href={`/profile/${comment.user.displayName}`}
              className="relative px-3 py-2 text-sm border rounded-lg shadow border-zinc-100 dark:border-zinc-500"
              key={comment.id}
            >
              <CommentLikeButton
                liked={comment?.likes ? comment?.likes.length > 0 : false}
                id={comment.id}
              />
              <h2 className="mb-1 text-base font-semibold">
                {comment.user.displayName}
              </h2>
              <p className="text-zinc-400">{comment.body}</p>
            </Link>
          ))}
      </div>
    </div>
  ) : null;
};

export default Comments;
