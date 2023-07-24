import React from 'react';
import 'react-phone-number-input/style.css';
import DispensariesMap from './components/DispensariesMap/DispensariesMap';
import useServerUser from '@/hooks/useServerUser';
import { User } from '@prisma/client';

export const metadata = {
  title: 'Dispensaries - Leafbase',
};

const Dispensaries = async () => {
  const user = await useServerUser();

  return (
    <div className="flex flex-col items-center justify-center w-full -mt-3">
      <DispensariesMap user={user as User} />
    </div>
  );
};

export default Dispensaries;

export const dynamic = 'force';
