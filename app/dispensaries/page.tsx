import { ErrorBoundary } from 'react-error-boundary';
import 'react-phone-number-input/style.css';
import React, { Suspense } from 'react';

import DispensariesListSkeleton from './components/DispensariesList/DispensariesListSkeleton';
import DispensariesMapError from './components/DispensariesMap/DispensariesMapError';
import DispensariesList from './components/DispensariesList/DispensariesList';
import DispensariesMap from './components/DispensariesMap/DispensariesMap';
import getServerUser from '@/utils/getServerUser';

export const metadata = {
  title: 'Dispensaries - Leafbase',
};

const Dispensaries = async () => {
  const user = await getServerUser();

  return (
    <div className="flex flex-col lg:flex-row justify-center w-full -mt-3 items-around">
      <div className="order-last lg:order-first">
        <ErrorBoundary fallback={<DispensariesListSkeleton />}>
          <Suspense fallback={<DispensariesListSkeleton />}>
            <DispensariesList user={user && user} />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="order-first lg:order-last">
        <ErrorBoundary fallback={<DispensariesMapError />}>
          <DispensariesMap user={user && user} />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Dispensaries;

export const dynamic = 'force-dynamic';
