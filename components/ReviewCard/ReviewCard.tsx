import React from "react";
import { Review } from "@/types/interfaces";
import StarRating from "../StarRating/StarRating";
import moment from "moment";
import { MdLocationPin } from "react-icons/md";

type Props = {
  review: Review;
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

const ReviewCard = (props: Props) => {
  const { review } = props;

  return (
    <div className="p-4 mb-5 border rounded shadow border-zinc-200 dark:border-transparent dark:bg-zinc-900">
      <div className="relative mb-2">
        <div className="flex flex-row items-center gap-2 mb-0.5">
          <div className="-ml-2.5 scale-75">
            <StarRating rating={review.rating} />
          </div>
        </div>
        <div className="absolute top-0 right-0 flex flex-col items-end text-sm">
          <span>{moment(review.createdAt).format("MMMM Do, h:mm a")}</span>
          <span className="flex flex-row items-center justify-center gap-1 text-sm text-zinc-500">
            <MdLocationPin />
            <span className="text-zinc-400">{review.user.location}</span>
          </span>
        </div>
        <div className="font-semibold text-zinc-500 dark:text-zinc-400">
          {review.user.displayName
            ? review.user.displayName
            : review.user.name && transformName(review.user.name)}
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
      <div className="text-sm">{review.body}</div>
    </div>
  );
};

export default ReviewCard;
