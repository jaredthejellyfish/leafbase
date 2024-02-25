import ForYou from '@/components/ForYou';
import UnderConstruction from '@/components/UnderConstruction';
import WhatToOrder from '@/components/WhatToOrder';

import React from 'react';

export const metadata = {
  title: 'Home - Leafbase',
};

export default function HomePage() {
  return (
    <main className="pt-2">
      {/* <UnderConstruction>HOME PAGE IS UNDER CONSTRUCTION</UnderConstruction> */}
      <ForYou />
      <div className="flex w-full flex-col gap-x-5 px-5 py-2 sm:flex-row sm:pt-6">
        <div className="w-full md:w-1/2">
          <WhatToOrder />
        </div>
      </div>
    </main>
  );
}
