'use client';

import { useQuery } from '@tanstack/react-query';

import { getWhatToOrder } from '@/lib/utils/getWhatToOrder';

import React from 'react';

function WhatToOrder() {
  const {
    data: order,
    error: orderError,
    isFetching: fetchingOrder,
  } = useQuery({
    queryKey: ['what-to-order'],
    queryFn: () => getWhatToOrder(),
  });
  return (
    <div className="rounded-lg bg-zinc-900 px-4 py-3">
      <h3 className="mb-1.5 text-xl font-bold">Suggested Order:</h3>
      {!orderError && fetchingOrder ? (
        <>
          <div className="mb-1.5 h-3 w-full animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
          <div className="mb-1.5 h-3 w-3/4 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
          <div className="mb-1.5 h-3 w-2/4 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
        </>
      ) : (
        <span className="text-zinc-400">{order}</span>
      )}
      {orderError && (
        <span>There was an error generating your suggested order.</span>
      )}
    </div>
  );
}

export default WhatToOrder;
