'use client';

import { SessionProvider } from 'next-auth/react';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 300000 } } })
  );

  return (
    <Provider store={store}>
      <SessionProvider>
        <QueryClientProvider client={client}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
    </Provider>
  );
}

export default Providers;
