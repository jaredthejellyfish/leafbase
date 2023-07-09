import React from 'react';
import siteLogo from '@/public/site-logo.png';
import Image from 'next/image';

type Props = { height?: number; width?: number };

const SiteLogo = (props: Props) => {
  return (
    <Image
      src={siteLogo}
      alt="site logo"
      className="border shadow rounded-xl border-zinc-100 dark:border-zinc-500"
      height={props.height || 64}
      width={props.width || 64}
    />
  );
};

export default SiteLogo;
