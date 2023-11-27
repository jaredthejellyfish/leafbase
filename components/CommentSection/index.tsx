import { ErrorBoundary } from 'react-error-boundary';
import { Plus } from 'lucide-react';
import React from 'react';

import CommentCard from './CommentCard';

type Props = {
  strainName: string;
  comments: {
    comment: string;
    created_at: string;
    id: string;
    strain_id: string;
    user_id: string;
    profile: {
      username: string;
      image: string | null;
    };
  }[];
};

function CommentSection({ comments, strainName }: Props) {
  return (
    <ErrorBoundary fallback={<div></div>}>
      <>
        <div className="my-3 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-x-3 text-[1.6em] font-bold">
            <span>Reviews for {strainName}</span>
            <span className="text-2xl text-zinc-400">({comments?.length})</span>
          </div>
          <button className="mt-0.5 rounded border border-zinc-400 p-0.5">
            <Plus className="h-6 w-6" />
          </button>
        </div>

        {comments.map((comment) => (
          <CommentCard comment={comment} key={comment.id} />
        ))}
      </>
    </ErrorBoundary>
  );
}

export default CommentSection;
