
import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Dispensary } from '@prisma/client';

type Props = {
  dispensary: Dispensary;
};

const getComments = async (dispensary: Dispensary) => {
  try {
    const comments = await prisma.dispensaryComment.findMany({
      where: {
        dispensaryId: dispensary.id,
      },
      include: {
        user: {
          select: {
            displayName: true,
          },
        },
      },
    });

    console.log('comments', comments);

    return comments;
  } catch (error) {
    console.log(error);
  }
};

const Comments = async (props: Props) => {
  const { dispensary } = props;
  const comments = await getComments(dispensary);

  return comments?.length && comments?.length > 0 ? (
    <div className="relative z-0 flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
      <h1 className="text-xl font-bold">Top Comments</h1>
      <div className="flex flex-col gap-3 mt-2">
        {comments &&
          comments?.length > 0 &&
          comments?.map((comment) => (
            <Link
              href={`/profile/${comment.user.displayName}`}
              className="px-3 py-2 text-sm border rounded-lg shadow border-zinc-100 dark:border-zinc-500"
              key={comment.id}
            >
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
