'use client';
import React, { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
  nextSectionId: string;
};

function NextSectionButton({ children, nextSectionId }: Props) {
  useEffect(() => {
    const htmlElement = document.getElementsByTagName('html')[0];
    // set the style scroll-snap-type: y proximity;
    htmlElement.style.scrollSnapType = 'y proximity';

    return () => {
      // remove the style scroll-snap-type: y proximity;
      htmlElement.style.scrollSnapType = '';
    };
  });

  function handleClick() {
    // Find the element with the specified ID.
    const sectionElement = document.getElementById(nextSectionId);

    if (sectionElement) {
      // Scroll the element into view with an offset.
      sectionElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // Align the top of the element with the top of the viewport.
        inline: 'nearest', // Align the nearest edge of the element with the nearest edge of the viewport.
      });
    } else {
      console.error(`Element with id '${nextSectionId}' not found.`);
    }
  }

  return (
    <button
      id="next-section"
      name="next-section"
      onClick={handleClick}
      className="cursor-pointer"
    >
      {children}
    </button>
  );
}

export default NextSectionButton;
