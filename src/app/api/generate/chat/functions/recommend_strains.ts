import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';

import type { Database } from '@l/database';

export const RecommendStrainsDataSchema = z.object({
  strains_name: z.string(),
  limit: z.number(),
});

export default async function recommend_strains(
  strains_name: string,
  limit: number,
) {
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookies(),
  });

  const { data: slug, error } = await supabase
    .from('strains')
    .select('slug')
    .eq('name', strains_name)
    .single();

  if (!slug ?? error) {
    return 'There was an error finding the strain you asked for.';
  }
  const { data: pairings, error: pairingsError } = await supabase.rpc(
    'find_closest_strains',
    {
      input_slug: slug.slug,
      limit_count: limit ? Math.min(limit, 5) : 3,
    },
  );

  if (pairingsError) {
    return 'There was an error finding the pairings for the strain you asked for.';
  }

  return {
    pairings,
  };
}
