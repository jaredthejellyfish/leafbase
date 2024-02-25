import { type Strain } from '../types';

export async function getForYouPage(page: number) {
  const res = await fetch(
    `/api/recommended?limit=10&page=${page < 0 ? 0 : page}`,
  );
  const data = (await res.json()) as { pairings: Strain[] };

  return data.pairings;
}
