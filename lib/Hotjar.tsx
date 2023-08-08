'use client';

import { hotjar } from 'react-hotjar';
import { useEffect } from 'react';

const Hotjar = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined')
      return;
    hotjar.initialize(3547434, 6);
  }, []);
  return null;
};

export default Hotjar;
