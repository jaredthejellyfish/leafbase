import styles from './UnderConstruction.module.css';

import React from 'react';

type Props = {
  children: string;
};

function UnderConstruction({ children }: Props) {
  return (
    <div className={styles.scrollingWrapper}>
      <div className={styles.scrollText}>
        <span className="text-black dark:text-white">{children}</span>
        <span className="px-2">-</span>
        <span className="text-black dark:text-white">{children}</span>
        <span className="px-2">-</span>
        <span className="text-black dark:text-white">{children}</span>
        <span className="px-2">-</span>
        <span className="text-black dark:text-white">{children}</span>
        <span className="px-2">-</span>
        <span className="text-black dark:text-white">{children}</span>
        <span className="px-2">-</span>
        <span className="text-black dark:text-white">{children}</span>
        <span className="px-2">-</span>
        <span className="text-black dark:text-white">{children}</span>
        <span className="px-2">-</span>
        <span className="text-black dark:text-white">{children}</span>
        <span className="px-2">-</span>
        <span className="text-black dark:text-white">{children}</span>
        <span className="px-2">-</span>
        <span className="text-black dark:text-white">{children}</span>
        <span className="px-2">-</span>
        <span className="text-black dark:text-white">{children}</span>
        <span className="px-2">-</span>
        <span className="text-black dark:text-white">{children}</span>
      </div>
    </div>
  );
}

export default UnderConstruction;
