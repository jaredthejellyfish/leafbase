import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';

import type { Database } from '@l/database';

export const GetRecommendedStrainsDataSchema = z.object({
  strains_names: z.array(z.string()),
  recommendation_reason: z.string(),
});

export default async function get_recommended_strains_data(
  strains_names: string[],
  recommendation_reason: string,
) {
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookies(),
  });

  const { data: strains, error } = await supabase
    .from('strains')
    .select('name, slug, nugImage')
    .in('name', strains_names);

  if (error) {
    throw error;
  }

  return {
    strains,
    recommendation_reason,
  };
}
