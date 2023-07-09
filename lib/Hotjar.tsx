'use client';

import { useEffect } from 'react';
import { hotjar } from 'react-hotjar';

const Hotjar = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined')
      return;
    hotjar.initialize(3547434, 6);
  }, []);
  return null;
};

export default Hotjar;
