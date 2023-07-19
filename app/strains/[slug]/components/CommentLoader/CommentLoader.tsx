'use client';

import React from 'react';
import { Comment } from '@/types/interfaces';
import { StrainExtended } from '@/types/interfaces';
import useUser from '@/hooks/useUser';
import dynamic from 'next/dynamic';

const CommentCard = dynamic(() => import('./CommentCard'), { ssr: false });

const AddCommentButton = dynamic(
  () => import('../AddCommentButton/AddCommentButton')
);

const AnimatePresence = dynamic(
  () => import('framer-motion').then((mod) => mod.AnimatePresence),
  { ssr: false }
);

type Props = { strain: StrainExtended };

const CommentLoader = (props: Props) => {
  const { strain } = props;
  const { user, isLoading, isFetching } = useUser();

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
            !isLoading &&
            !isFetching &&
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
                  comment={comment}
                  userId={user?.id}
                />
              ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default CommentLoader;