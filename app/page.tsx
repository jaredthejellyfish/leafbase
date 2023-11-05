'use client';

import React, { useState } from 'react';

import SearchResults from '@/components/SearchResults';
import { Input } from '@/components/ui/input';

export default function Home() {
  const [query, setQuery] = useState<string | undefined>(undefined);

  return (
    <main>
      <Input value={query} onChange={(e) => setQuery(e.target.value)} />
      <SearchResults query={query} />
    </main>
  );
}
