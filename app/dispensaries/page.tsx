import React from 'react';
import 'react-phone-number-input/style.css';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import DispensariesMap from './components/DispensariesMap/DispensariesMap';
import useServerUser from '@/hooks/useServerUser';
import { User } from '@prisma/client';

export const metadata = {
  title: 'Dispensaries - Leafbase',
};

const getDispensaries = async (count: number) => {
  const dispensaries = await prisma.dispensary.findMany({ take: count });
  return dispensaries;
};

const Dispensaries = async () => {
  const dispensaries = await getDispensaries(50);
  const user = await useServerUser();

  return (
    <div className='flex flex-col'>
      {dispensaries &&
        dispensaries.map((dispensary) => (
          <Link
            key={dispensary.id}
            href={`/dispensaries/${dispensary?.slug || NaN}`}
          >
            {dispensary.name || NaN}
          </Link>
        ))}

        <DispensariesMap user={user as User}/>
    </div>
  );
};

export default Dispensaries;
