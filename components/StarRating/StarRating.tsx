import React from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

const StarRating = (props: { rating: number; className?: string }) => {
  const rating = props.rating;
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      stars.push(
        <span className="flex items-center justify-center w-4 h-4" key={i}>
          <FaStar data-testid="full-star" />
        </span>
      );
    } else if (i === Math.floor(rating) && rating % 1 !== 0) {
      stars.push(
        <span className="flex items-center justify-center w-4 h-4" key={i}>
          <FaStarHalfAlt data-testid="half-star" />
        </span>
      );
    } else {
      stars.push(
        <span className="flex items-center justify-center w-4 h-4" key={i}>
          <FaRegStar data-testid="empty-star" />
        </span>
      );
    }
  }
  return (
    <div
      style={{ display: 'flex' }}
      className={`flex flex-row text-black ${
        props.className ? props.className : 'dark:text-white'
      } `}
    >
      {stars}
    </div>
  );
};

export default StarRating;
