import React from 'react';
import 'react-phone-number-input/style.css';
import DispensariesMap from './components/DispensariesMap/DispensariesMap';
import useServerUser from '@/hooks/useServerUser';
import { User } from '@prisma/client';
import DispensariesList from './components/DispensariesList/DispensariesList';
import { ErrorBoundary } from 'react-error-boundary';
import DispensariesMapSkeleton from './components/DispensariesMap/DispensariesMapSkeleton';

export const metadata = {
  title: 'Dispensaries - Leafbase',
};

const Dispensaries = async () => {
  const user = await useServerUser();

  return (
    <div className="flex flex-row justify-center w-full -mt-3 items-around">
      <DispensariesList user={user as User} />
      <ErrorBoundary fallback={<DispensariesMapSkeleton />}>
        <DispensariesMap user={user as User} />
      </ErrorBoundary>
    </div>
  );
};

export default Dispensaries;

export const dynamic = 'force-dynamic';
