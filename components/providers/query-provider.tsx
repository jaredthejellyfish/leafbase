'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';

type Props = {
  children: React.ReactNode;
};

const QueryProvider = (props: Props) => {
  const [client] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 300000 } } })
  );
  return (
    <QueryClientProvider client={client}>{props.children}</QueryClientProvider>
  );
};

export default QueryProvider;
