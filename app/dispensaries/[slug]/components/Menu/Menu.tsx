import React from 'react';
import { Prisma, Strain } from '@prisma/client';
import MenuStrainCard from './MenuStrainCard';

type Props = {
  strains: Strain[];
  prices: Prisma.JsonValue[];
};

const Menu = (props: Props) => {
  const { strains, prices } = props;

  return (
    <div>
      <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-100">
        Menu:
      </h2>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2 text-xl font-semibold text-gray-800 md:gap-5 dark:text-gray-100">
            {strains.map((strain) => (
              <MenuStrainCard key={strain.id} strain={strain} prices={prices} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
