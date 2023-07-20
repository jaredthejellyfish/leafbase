'use client';

import React from 'react';
import { BsTrashFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type Props = { commentId: string };

const DeleteCommentButton = (props: Props) => {
  const router = useRouter();

  const deleteComment = async (commentId: string) => {
    const res = await fetch('/api/strains/comment/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentId: commentId }),
    });

    const status = await res.json();

    if ((status && status?.error) || !status)
      toast.error('Error deleting comment');
    else toast.success('Comment deleted');

    router.refresh();
  };

  return (
    <BsTrashFill
      className="cursor-pointer"
      onClick={() => deleteComment(props.commentId)}
    />
  );
};

export default DeleteCommentButton;
