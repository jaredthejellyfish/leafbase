import { Like, User } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

import prisma from '@/lib/prisma';

type Props = {
  user: User;
};

interface StrainName {
  name: string;
  slug: string;
}

interface Comment {
  id: string;
  userId: string;
  strainId: string;
  body: string;
  createdAt: Date;
  strain: StrainName;
  likes?: Like[];
}

const getComments = async (user: User) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        userId: user.id,
      },
      include: {
        likes: {
          where: {
            userId: user.id,
          },
        },
        strain: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

    return comments;
  } catch (error) {
    console.log(error);
  }
};

function pickRandomComments(comments: Comment[], count = 4): Comment[] {
  const shuffledComments = [...comments].sort(() => Math.random() - 0.5);
  const selectedComments: Comment[] = [];

  for (const comment of shuffledComments) {
    if (!selectedComments.some((r) => r.strain.name === comment.strain.name)) {
      selectedComments.push(comment);

      if (selectedComments.length >= count) {
        break;
      }
    }
  }

  return selectedComments;
}

const Comments = async (props: Props) => {
  const { user } = props;
  const defaultComments = await getComments(user);
  const comments = pickRandomComments(defaultComments as unknown as Comment[]);

  return comments?.length && comments?.length > 0 ? (
    <div className="relative z-0 flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
      <h1 className="text-xl font-bold">Comments</h1>
      <div className="flex flex-col gap-3 mt-2">
        {comments &&
          comments?.length > 0 &&
          comments?.map((comment) => (
            <Link
              href={`/strains/${comment?.strain?.slug}`}
              className="relative px-3 py-2 text-sm border rounded-lg shadow border-zinc-100 dark:border-zinc-500"
              key={comment.id}
            >
              <h2 className="mb-1 text-base font-semibold">
                {comment.strain.name}
              </h2>
              <p className="text-zinc-400">{comment.body}</p>
            </Link>
          ))}
      </div>
    </div>
  ) : null;
};

export default Comments;
