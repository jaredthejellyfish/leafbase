"use client";

import React from "react";
import { Comment } from "@/types/interfaces";
import moment from "moment";
import Link from "next/link";
import DeleteCommentButton from "./DeleteCommentButton";
import { motion } from "framer-motion";

type Props = {
  comment: Comment;
};

function transformName(name: string): string {
  const parts = name.split(" ");
  if (parts.length <= 1) {
    return name; // Return the name as is if there are no spaces
  }

  const firstName = parts[0];
  const transformedParts = parts
    .slice(1)
    .map((part) => part.charAt(0).toUpperCase() + ".");
  return `${firstName} ${transformedParts.join(" ")}`;
}

const CommentCard = (props: Props) => {
  const { comment } = props;

  return (
    <motion.div
      className="p-4 mb-5 border rounded shadow border-zinc-200 dark:border-transparent dark:bg-zinc-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0 }}
    >
      <div className="relative mb-2">
        <div className="absolute top-0 right-0 flex text-sm">
          <span>{moment(comment.createdAt).format("MMMM Do, h:mm a")}</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
          {comment.user.displayName ? (
            <Link
              className="font-semibold"
              href={`/profile/${comment.user.displayName}`}
            >
              {comment.user.displayName}
            </Link>
          ) : (
            <div className="font-semibold">
              {comment.user.name && transformName(comment.user.name)}
            </div>
          )}
          <DeleteCommentButton commentId={comment.id} />
        </div>
      </div>
      <svg width="100%" height="1" className="mb-3">
        <line
          x1="0.5%"
          y1="0"
          x2="99%"
          y2="0"
          className="mb-1 stroke-1 stroke-zinc-500"
        />
      </svg>
      <div className="text-sm">{comment.body}</div>
    </motion.div>
  );
};

export default CommentCard;
