'use client';

import { Dispensary } from '@prisma/client';
import dynamic from 'next/dynamic';
import React from 'react';

import DispensaryMapSkeleton from './DispensaryMapSkeleton';

type Props = {
  lat: number;
  lon: number;
  address: string;
  dispensary: Dispensary;
};

const DispensaryMap = dynamic(() => import('./DispensaryMap'), {
  ssr: false,
  loading: () => <DispensaryMapSkeleton />,
});

const DispensaryMapDynamic = (props: Props) => {
  return (
    <DispensaryMap
      dispensary={props.dispensary}
      address={props.address}
      lat={props.lat}
      lon={props.lon}
    />
  );
};

export default DispensaryMapDynamic;
