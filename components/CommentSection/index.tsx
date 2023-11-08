import { ErrorBoundary } from 'react-error-boundary';
import React from 'react';

import CommentCard from './CommentCard';

type Props = {
  comments: {
    comment: string;
    created_at: string;
    id: string;
    strain_id: string;
    user_id: string;
    profile: {
      displayName: string;
      image: string | null;
    };
  }[];
};

function CommentSection({ comments }: Props) {
  return (
    <ErrorBoundary fallback={<div>Error!</div>}>
      {comments.map((comment) => (
        <CommentCard comment={comment} key={comment.id} />
      ))}
    </ErrorBoundary>
  );
}

export default CommentSection;
