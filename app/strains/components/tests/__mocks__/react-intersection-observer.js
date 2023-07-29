import React from 'react';

// Mocked implementation of useInView
export const useInView = () => {
  return {
    inView: true, // You can set it to true or false to simulate whether the component is in view or not
    ref: React.createRef(),
    entry: null,
  };
};
