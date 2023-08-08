'use client';

import { BsTrashFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { Comment } from '@prisma/client';
import { toast } from 'react-toastify';
import React from 'react';

type Props = { commentId: string };

const DeleteCommentButton = (props: Props) => {
  const router = useRouter();

  const deleteComment = async (commentId: string) => {
    const res = await fetch('/api/strains/comment/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentId: commentId }),
    });

    const status = (await res.json()) as { comment?: Comment; error?: string };

    if ((status && status?.error) || !status)
      toast.error('Error deleting comment');
    else toast.success('Comment deleted');

    router.refresh();
  };

  return (
    <button
      data-testid="delete-comment-button"
      onClick={() => deleteComment(props.commentId)}
    >
      <BsTrashFill className="cursor-pointer" />
    </button>
  );
};

export default DeleteCommentButton;
