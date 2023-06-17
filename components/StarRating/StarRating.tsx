import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = (props: { rating: number }) => {
  const rating = props.rating;
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      stars.push(
        <span className="h-4 w-4 flex justify-center items-center" key={i}>
          <FaStar />
        </span>
      );
    } else if (i === Math.floor(rating) && rating % 1 !== 0) {
      stars.push(
        <span className="h-4 w-4 flex justify-center items-center" key={i}>
          <FaStarHalfAlt />
        </span>
      );
    } else {
      stars.push(
        <span className="h-4 w-4 flex justify-center items-center" key={i}>
          <FaRegStar />
        </span>
      );
    }
  }
  return (
    <div className="flex flex-row text-black dark:text-white">
    {stars}
    </div>
  );
};

export default StarRating;
