'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import React, { useState } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/store/store';

function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 300000 } } })
  );

  return (
    <Provider store={store}>
      <SessionProvider>
        <QueryClientProvider client={client}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} position={'bottom-right'} />
        </QueryClientProvider>
      </SessionProvider>
    </Provider>
  );
}

export default Providers;
