'use client';

import React from 'react';
import DispensaryMapSkeleton from './DispensaryMapSkeleton';

type Props = {
  lat: number;
  lon: number;
};

const DispensaryMapDynamic = (props: Props) => {
  const DispensaryMap = React.lazy(() => import('./DispensaryMap'));

  return (
    <DispensaryMap lat={props.lat} lon={props.lon} /> || (
      <DispensaryMapSkeleton />
    )
  );
};

export default DispensaryMapDynamic;
