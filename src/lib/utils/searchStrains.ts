import type { SearchStrain } from "../types";

export async function searchStrains(query?: string) {
    const res = await fetch(`/api/strains/search?query=${query}`);
    const data = (await res.json()) as SearchStrain[];
    return data;
  }