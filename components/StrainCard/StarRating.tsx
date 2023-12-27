import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

import React from 'react';

const StarRating = (props: { rating: number; className?: string }) => {
  const rating = props.rating;
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      stars.push(
        <span className="flex h-4 w-4 items-center justify-center" key={i}>
          <FaStar data-testid="full-star" />
        </span>,
      );
    } else if (i === Math.floor(rating) && rating % 1 !== 0) {
      stars.push(
        <span className="flex h-4 w-4 items-center justify-center" key={i}>
          <FaStarHalfAlt data-testid="half-star" />
        </span>,
      );
    } else {
      stars.push(
        <span className="flex h-4 w-4 items-center justify-center" key={i}>
          <FaRegStar data-testid="empty-star" />
        </span>,
      );
    }
  }
  return (
    <div
      style={{ display: 'flex' }}
      id="strain-star-rating"
      className={`flex flex-row text-black ${
        props.className ? props.className : 'dark:text-white'
      } `}
    >
      {stars}
    </div>
  );
};

export default StarRating;
