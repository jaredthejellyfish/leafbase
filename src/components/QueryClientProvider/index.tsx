"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

const QueryProvider = ({ children }: Props) => {
  const [client] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 300000 } } }),
  );
  return (
    <QueryClientProvider client={client}>
      {children} <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default QueryProvider;
