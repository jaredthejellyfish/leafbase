'use client';
import React from 'react';

type Props = { children: React.ReactNode };

function NextSectionButton({ children }: Props) {
  function handleClick() {
    // Calculate the current viewport height.
    const screenHeight = window.innerHeight;

    // Advance the scroll position by one screen height.
    window.scrollBy({
      top: screenHeight, // Scroll down by one screen height.
      left: 0, // No horizontal scroll.
      behavior: 'smooth', // Optional: Adds smooth scrolling.
    });

    console.log(
      'NextSectionButton clicked and page scrolled by one screen height'
    );
  }

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {children}
    </div>
  );
}

export default NextSectionButton;
