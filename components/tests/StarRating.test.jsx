import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react';
import StarRating from '../StarRating/StarRating';
import React from 'react';

describe('StarRating', () => {
  it('renders correctly', () => {
    render(<StarRating rating={5} />);

    const fullStars = screen.getAllByTestId('full-star');

    expect(fullStars.length).toBe(5);
  });

  it('renders classname correctly', () => {
    render(<StarRating rating={1} className="test-class" />);

    const starRating = screen.getByTestId('full-star').parentElement.parentElement;

    expect(starRating).toHaveClass('test-class');
  });

  it('renders correct number of full stars', () => {
    render(<StarRating rating={3.5} />);

    const fullStars = screen.getAllByTestId('full-star');

    expect(fullStars.length).toBe(3);
  });

  it('renders correct number of half stars', () => {
    render(<StarRating rating={3.5} />);

    const halfStars = screen.getAllByTestId('half-star');

    expect(halfStars.length).toBe(1);
  });

  it('renders correct number of empty stars', () => {
    render(<StarRating rating={3.5} />);

    const emptyStars = screen.getAllByTestId('empty-star');

    expect(emptyStars.length).toBe(1);
  });

  it('renders correct stars with integer rating', () => {
    render(<StarRating rating={4} />);

    const fullStars = screen.getAllByTestId('full-star');
    const emptyStars = screen.getAllByTestId('empty-star');

    expect(fullStars.length).toBe(4);
    expect(emptyStars.length).toBe(1);
  });

  it('renders correct stars with zero rating', () => {
    render(<StarRating rating={0} />);

    const emptyStars = screen.getAllByTestId('empty-star');

    expect(emptyStars.length).toBe(5);
  });

  it('renders correct stars for each possible rating', () => {
    for (let i = 0; i <= 5; i += 0.5) {
      render(<StarRating rating={i} />);

      const fullStars = screen.queryAllByTestId('full-star');
      const halfStars = screen.queryAllByTestId('half-star');
      const emptyStars = screen.queryAllByTestId('empty-star');

      expect(fullStars.length).toBe(Math.floor(i));
      expect(halfStars.length).toBe(i % 1 !== 0 ? 1 : 0);
      expect(emptyStars.length).toBe(5 - Math.ceil(i));
      // cleanup after each render to remove elements from the DOM
      cleanup();
    }
  });
});
