'use client';

import { format, parseJSON } from 'date-fns';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

import DeleteCommentButton from './DeleteCommentButton';

type Props = {
  canDelete: boolean;
  comment: {
    comment: string;
    created_at: string;
    id: string;
    strain_id: string;
    user_id: string;
    profile: {
      username: string;
      image: string | null;
    };
  };
};

const CommentCard = (props: Props) => {
  const { comment, canDelete } = props;

  return (
    <motion.div
      className="relative mb-5 rounded border border-zinc-200 p-4 shadow dark:border-transparent dark:bg-zinc-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0 }}
    >
      <div className="relative mb-2">
        <div className="absolute right-0 top-0 flex flex-row items-center gap-x-3 text-sm">
          <DeleteCommentButton comment_id={comment.id} canDelete={canDelete} />
          <span>
            {comment?.created_at &&
              format(parseJSON(comment.created_at), 'MMMM dd, h:mm a')}
          </span>
        </div>
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
          <Link
            className="font-semibold"
            href={`/profile/${comment.profile.username}`}
          >
            @{comment.profile.username}
          </Link>
        </div>
      </div>
      <svg width="100%" height="1" className="mb-3">
        <line
          x1="0.5%"
          y1="0"
          x2="99%"
          y2="0"
          className="mb-1 stroke-zinc-500 stroke-1"
        />
      </svg>
      <div className="text-sm">{comment.comment}</div>
    </motion.div>
  );
};

export default CommentCard;
