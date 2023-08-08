import Image from 'next/image';
import React from 'react';

import siteLogo from '@/public/png/site-logo.png';

type Props = { height?: number; width?: number };

const SiteLogo = (props: Props) => {
  return (
    <Image
      src={siteLogo}
      alt="site logo"
      className="border rounded-lg shadow border-zinc-100 dark:border-zinc-500"
      height={props.height || 64}
      width={props.width || 64}
    />
  );
};

export default SiteLogo;
