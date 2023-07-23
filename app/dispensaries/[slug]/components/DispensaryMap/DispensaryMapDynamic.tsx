'use client';

import React from 'react';
import DispensaryMapSkeleton from './DispensaryMapSkeleton';
import dynamic from 'next/dynamic';

type Props = {
  lat: number;
  lon: number;
  address: string;
};

const DispensaryMap = dynamic(() => import('./DispensaryMap'), {
  ssr: false,
  loading: () => <DispensaryMapSkeleton />,
});

const DispensaryMapDynamic = (props: Props) => {
  return (
    <DispensaryMap address={props.address} lat={props.lat} lon={props.lon} />
  );
};

export default DispensaryMapDynamic;
