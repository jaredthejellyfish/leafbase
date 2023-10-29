import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import React from 'react';

import FilterByMenu from '@/components/FilterByMenu';
import StrainCard from '@/components/StrainCard';
import type { Database } from '@/lib/database';
import type { Strain } from '@/lib/types';

const StrainsPage = async (request: { searchParams: { filter?: string } }) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    count,
    data: strains,
  } = await supabase
    .from('strains')
    .select('*', { count: 'estimated', head: false })
    .limit(20)
    .returns<Strain[]>();

  return (
    <main className="flex flex-col items-center justify-center px-6 xl:px-52">
      <div className="max-w-4xl">
        <h1 className="mt-4 mb-2 text-3xl font-bold ">All strains</h1>
        <p className="">
          Browse the most comprehensive weed strain library on the web. Browse
          weed strains by cannabis type (indica, sativa, or hybrid), effects, or
          number of comments.
        </p>
        <div className="flex items-center justify-between px-1 font-medium">
          <span className="mt-4 text-xs text-zinc-400">{count} strains</span>
          <span className="flex flex-row items-center gap-1 mb-1 text-xs text-zinc-400">
            <FilterByMenu filter={request.searchParams.filter} />
          </span>
        </div>
        <span className="hidden w-full p-2 mt-1 text-xs border rounded md:block border-zinc-600/50 text-zinc-600">
          These results are based on user comments and are not a substitute for
          professional medical advice.
        </span>
        <div className="flex items-center justify-center w-full">
          <div className="relative grid max-w-4xl md:grid-cols-3 gap-x-4">
            {strains?.map((strain) => (
              <StrainCard strain={strain} key={strain.id} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default StrainsPage;
