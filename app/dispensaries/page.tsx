import React, { Suspense } from 'react';
import 'react-phone-number-input/style.css';
import { User } from '@prisma/client';
import { ErrorBoundary } from 'react-error-boundary';
import useServerUser from '@/hooks/useServerUser';
import DispensariesMap from './components/DispensariesMap/DispensariesMap';
import DispensariesMapSkeleton from './components/DispensariesMap/DispensariesMapSkeleton';
import DispensariesListSkeleton from './components/DispensariesList/DispensariesListSkeleton';
import DispensariesList from './components/DispensariesList/DispensariesList';

export const metadata = {
  title: 'Dispensaries - Leafbase',
};

const Dispensaries = async () => {
  const user = await useServerUser();

  return (
    <div className="flex flex-col lg:flex-row justify-center w-full -mt-3 items-around">
      <div className="order-last lg:order-first">
        <ErrorBoundary fallback={<DispensariesListSkeleton />}>
          <Suspense fallback={<DispensariesListSkeleton />}>
            <DispensariesList user={user as User} />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="order-first lg:order-last">
        <ErrorBoundary fallback={<DispensariesMapSkeleton />}>
          <DispensariesMap user={user as User} />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Dispensaries;

export const dynamic = 'force-dynamic';
