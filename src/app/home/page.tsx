import React from 'react';

import ForYou from '@c/ForYou';
import WhatToOrder from '@c/WhatToOrder';

import { getServerForYouPage } from '@u/getServerForYouPage';
import { getServerOrder } from '@u/getServerOrder';

async function Home() {
  const { data } = await getServerForYouPage(0, 5);
  const { order } = await getServerOrder();

  return (
    <main className="pt-2">
      <ForYou initialData={data ?? undefined} />
      <div className="flex w-full flex-col gap-x-5 px-3.5 py-2 sm:flex-row sm:px-4 sm:pt-6">
        <div className="w-full md:w-1/2">
          <WhatToOrder order={order} />
        </div>
      </div>
    </main>
  );
}

export default Home;

export const dynamic = 'force-dynamic';
