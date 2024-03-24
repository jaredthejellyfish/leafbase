'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import { cn } from '@u/cn';

type Props = {
  pairing: {
    body: null | string;
    created_at: null | string;
    id: null | string;
    strain1_id: string;
    strain2_id: string;
    strain2_slug: string;
    strain2_name: string;
    image: null | string;
  };
};

function Pairing({
  pairing: {
    strain1_id,
    strain2_id,
    strain2_name,
    strain2_slug,
    image,
    body: existingBody,
  },
}: Props) {
  const [body, setBody] = useState(existingBody ?? '');

  async function streamedCompletion() {
    try {
      const response = await fetch(
        `/api/generate/short-pairing?strain1=${strain1_id}&strain2=${strain2_id}`,
      );

      if (!response.ok || !response.body) {
        throw response.statusText;
      }

      if (body.length > 0) {
        await response.body.cancel();
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const loopRunner = true;
      while (loopRunner) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const decodedChunk = decoder.decode(value, { stream: true });
        setBody((answer) => (answer + decodedChunk).replace('"', ''));
      }
    } catch (error) {
      return { ok: false, error: (error as Error).message };
    } finally {
      setBody((answer) => answer.replace('"', ''));

      return { ok: true, error: null };
    }
  }

  const { data, isFetching } = useQuery({
    queryKey: ['pairing', strain1_id, strain2_id],
    queryFn: () => streamedCompletion(),
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    enabled: Boolean(!existingBody?.length),
  });

  if (!isFetching && !data?.ok && !existingBody?.length) {
    return <div>Error generating recommendation...</div>;
  }

  return (
    <Link
      href={`/strains/${strain2_slug}`} // <- /strain
      className={cn(
        'flex flex-row items-center gap-3 rounded border border-zinc-300 py-3 pl-2 pr-3 dark:border-zinc-700',
        body && 'justify-between',
      )}
    >
      {image ? (
        <div className="size-[98px] flex items-center justify-center">
          <Image
            src={image}
            alt={strain2_name}
            width={96}
            height={96}
            priority
          />
        </div>
      ) : (
        <div className="size-24 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
      )}

      <div className="max-w-[80%] text-sm w-full flex flex-col items-start justify-center">
        <h2 className="text-sm font-semibold text-black dark:text-zinc-200">
          {strain2_name || strain2_name}
        </h2>
        {existingBody && existingBody?.length > 0 ? (
          existingBody
        ) : body.length > 0 ? (
          body
        ) : (
          <>
            <div className="mt-2 h-3 w-full animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
            <div className="mt-1.5 h-3 w-48 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
            <div className="mt-1.5 h-3 w-[80%] animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
          </>
        )}
      </div>
    </Link>
  );
}

export default Pairing;
