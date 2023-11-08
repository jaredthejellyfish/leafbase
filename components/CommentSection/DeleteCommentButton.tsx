import dynamic from 'next/dynamic';
import React from 'react';

type Props = {
  comment_id: string;
};

function DeleteCommentButton({}: Props) {
  return <div>DeleteCommentButton</div>;
}

export default dynamic(() => Promise.resolve(DeleteCommentButton), {
  loading: () => <div>Loading...</div>,
});
