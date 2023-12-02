'use client';

import { formatDistanceToNow, parseJSON } from 'date-fns';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import DeleteCommentButton from './DeleteCommentButton';
import LikeCommentButton from './LikeCommentButton';
import defaultPfp from '@/public/default.webp';

type Props = {
  canDelete: boolean;
  isLiked: boolean;
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
  const { comment, canDelete, isLiked } = props;

  return (
    <motion.div
      className="relative mb-5 rounded border border-zinc-200 p-4 shadow dark:border-transparent dark:bg-zinc-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0 }}
    >
      <div className="mb-3.5 flex flex-row justify-between">
        <Link
          href={`/profile/${comment.profile.username}`}
          className="flex flex-row items-center gap-x-4"
        >
          <Image
            src={comment.profile.image || defaultPfp}
            alt={`@${comment.profile.username}'s profile picture`}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-semibold">@{comment.profile.username}</span>
            {comment?.created_at && (
              <span className="text-sm text-zinc-500">
                {formatDistanceToNow(parseJSON(comment.created_at), {
                  includeSeconds: true,
                  addSuffix: true,
                })}
              </span>
            )}
          </div>
        </Link>
        <div className="px-2">
          {canDelete && (
            <DeleteCommentButton
              comment_id={comment.id}
              canDelete={canDelete}
            />
          )}
          {!canDelete && (
            <LikeCommentButton comment_id={comment.id} isLiked={isLiked} />
          )}
        </div>
      </div>
      <span>{comment.comment.length > 0 && comment.comment}</span>
    </motion.div>
  );
};

export default CommentCard;
