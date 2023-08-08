'use client';

import { AiOutlinePlus } from 'react-icons/ai';
import { User } from '@prisma/client';
import dynamic from 'next/dynamic';
import React from 'react';

import { Comment, CommentExtended } from '@/types/interfaces';
import { StrainExtended } from '@/types/interfaces';

const CommentCard = dynamic(() => import('./CommentCard'), { ssr: false });

const AddCommentButton = dynamic(() => import('./AddCommentButton'), {
  loading: () => (
    <button className="flex flex-row gap-2 p-2 text-green-700 transition scale-90 border border-green-700 rounded-lg sm:p-2 sm:px-2 sm:pr-3 md:scale-100 hover:bg-green-700 hover:text-white hover:dark:bg-zinc-500 hover:dark:text-zinc-200 text-md dark:border-zinc-500 dark:text-zinc-400 w-fit">
      <AiOutlinePlus size={25} />
      <span className="hidden sm:block">Add Comment</span>
    </button>
  ),
});

const AnimatePresence = dynamic(
  () => import('framer-motion').then((mod) => mod.AnimatePresence),
  { ssr: false }
);

type Props = { strain: StrainExtended; user?: User };

const CommentLoader = (props: Props) => {
  const { strain, user } = props;

  return (
    <>
      <div className="flex flex-row items-end justify-between w-full gap-3">
        <h1 className="flex flex-row items-center mt-6 text-2xl font-bold">
          Comments for {strain.name}:
        </h1>
        <AddCommentButton strain={strain} />
      </div>
      <div className="flex flex-col w-full">
        <AnimatePresence>
          {user &&
            strain.comments &&
            strain.comments.length > 0 &&
            strain.comments
              .sort(
                (a: Comment, b: Comment) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((comment: Comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment as CommentExtended}
                  userId={user?.id}
                />
              ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default CommentLoader;
