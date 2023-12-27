'use client';

import type { Session } from '@supabase/auth-helpers-nextjs';
import { Plus } from 'lucide-react';
import { ErrorBoundary } from 'react-error-boundary';

import Modal from '@/components/Modal';
import TextAreaAuto from '@/components/TextAreaAuto';

import { comment } from '@/lib/actions/comment/comment';

import CommentCard from './CommentCard';

import React, { useState } from 'react';

type Props = {
  strainName: string;
  strainId: string;
  strainSlug: string;
  session: Session | null;
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
    comment_likes: {
      user_id: string;
      id: string;
    }[];
  }[];
};

function CommentSection({
  comments,
  strainName,
  strainId,
  strainSlug,
  session,
}: Props) {
  const [open, setOpen] = useState(false);

  const [commentValue, setCommentValue] = useState('');
  const commentWithSlug = comment.bind(null, strainId).bind(null, strainSlug);

  function handleClick() {
    commentWithSlug(commentValue);
    setCommentValue('');
    setOpen(false);
  }

  if (!session) return null;

  return (
    <ErrorBoundary fallback={<div></div>}>
      <>
        <div className="my-3 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-x-3 text-[1.3em] font-bold">
            <span>Comments for {strainName}</span>
            <span className="text-[0.9em] text-zinc-400">
              ({comments?.length || 0})
            </span>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="mt-0.5 rounded border border-zinc-400 p-0.5"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>

        {comments &&
          comments.length > 0 &&
          comments.map((comment) => (
            <CommentCard
              canDelete={session?.user.id === comment.user_id}
              comment={comment}
              key={comment.id}
              isLiked={
                comment.comment_likes.filter(
                  (like) => like.user_id === session?.user.id,
                ).length > 0
              }
            />
          ))}

        <Modal open={open} setOpen={setOpen} title="Comment">
          <TextAreaAuto
            value={commentValue}
            setValue={setCommentValue}
            name="comment"
            id="leave-a-comment"
            placeholder="Leave a comment..."
            className="w-full"
          />
          <div className="flex w-full items-center justify-center">
            <button
              onClick={() => handleClick()}
              className="mr-2 mt-1 w-2/3 rounded-xl bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </Modal>
      </>
    </ErrorBoundary>
  );
}

export default CommentSection;
