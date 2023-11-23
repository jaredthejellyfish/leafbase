'use client';
import React from 'react';

type Props = { children: React.ReactNode; nextSectionId: string };

function NextSectionButton({ children, nextSectionId }: Props) {
  function handleClick() {
    // Find the element with the specified ID.
    const sectionElement = document.getElementById(nextSectionId);

    if (sectionElement) {
      // Scroll the element into view.
      sectionElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // Align the top of the element with the top of the viewport.
      });
    } else {
      console.error(`Element with id '${nextSectionId}' not found.`);
    }
  }

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {children}
    </div>
  );
}

export default NextSectionButton;
