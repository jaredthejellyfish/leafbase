import React from "react";

const StarRating = (props: { rating: number }) => {
  const rating = props.rating;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(
        <span className="h-4 w-4 flex justify-center items-center" key={i}>
          ★
        </span>
      );
    } else {
      stars.push(
        <span className="h-4 w-4 flex justify-center items-center" key={i}>
          ☆
        </span>
      );
    }
  }
  return (
    <div className="flex flex-row gap-1 text-black dark:text-zinc-400 dark:tex-white">
      {stars}
    </div>
  );
};

export default StarRating;
