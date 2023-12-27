import { Trash2Icon } from 'lucide-react';

import { toast } from '@/components/ui/use-toast';

import { deleteComment } from '@/lib/actions/comment/delete';

import React from 'react';

type Props = {
  comment_id: string;
  canDelete: boolean;
  className?: string;
};

function DeleteCommentButton({ comment_id, canDelete, className }: Props) {
  async function handleClick() {
    const result = await deleteComment(comment_id);
    if (result.error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    }
    if (result.deleted) {
      toast({
        title: 'Comment deleted',
        description: 'Your comment has been deleted',
      });
    }
  }

  if (!canDelete) return null;

  return (
    <button onClick={handleClick} className={className}>
      <Trash2Icon className="h-5 w-5" />
    </button>
  );
}

export default DeleteCommentButton;
