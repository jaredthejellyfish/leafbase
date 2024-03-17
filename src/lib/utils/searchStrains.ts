import type { SearchStrain } from '@l/types';

export async function searchStrains(signal: AbortSignal, query?: string) {
  const res = await fetch(`/api/strains/search?query=${query}`, { signal });
  const data = (await res.json()) as { data: SearchStrain[] };
  return data.data;
}
