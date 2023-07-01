"use client";

import { SessionProvider } from "next-auth/react";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Hotjar from '@hotjar/browser';

const siteId = 3547434;
const hotjarVersion = 6;

Hotjar.init(siteId, hotjarVersion);

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
