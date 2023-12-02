import { Trash2Icon } from 'lucide-react';
import React from 'react';

import { deleteComment } from '@/lib/actions/comment/delete';
import { toast } from '../ui/use-toast';

type Props = {
  comment_id: string;
  canDelete: boolean;
};

function DeleteCommentButton({ comment_id, canDelete }: Props) {
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
    <button onClick={handleClick}>
      <Trash2Icon className="h-5 w-5" />
    </button>
  );
}

export default DeleteCommentButton;
