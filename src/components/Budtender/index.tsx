import dynamic from 'next/dynamic';
import React from 'react';
import { RiMessage2Line } from 'react-icons/ri';

import getServerUserProfile from '@u/getServerUserProfile';

const BudtenderModal = dynamic(() => import('@c/Budtender/budtender-modal'), {
  ssr: false,
  loading: () => (
    <button className="animate-pulse fixed bottom-5 right-5 size-[3.2em] p-2.5 hover:bg-zinc-300 dark:hover:bg-zinc-500 bg-zinc-200 rounded-full shadow-xl dark:bg-zinc-700 border-zinc-800 border-2 opacity-100 transition-all scale-100 z-50 flex items-center justify-center">
      <RiMessage2Line className="size-full" />
    </button>
  ),
});

async function Budtender() {
  const { user } = await getServerUserProfile();

  if (!user) return null;
  else return <BudtenderModal userName={user?.name ?? user?.username ?? ''} />;
}

export default Budtender;
