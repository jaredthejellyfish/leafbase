import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { Database } from '@l/database';
import type { Strain } from '@l/types';

export async function getServerForYouPage(page: number, limit: number) {
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookies(),
  });

  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();

  if (sessionError ?? !user) {
    return { error: sessionError, data: null };
  }

  const { data: likedStrains, error: likedStrainsError } = await supabase
    .from('strain_likes')
    .select('strain_id')
    .eq('user_id', user.id);

  if (likedStrainsError) {
    return { error: likedStrainsError, data: null };
  }

  const flattenedLikedStrains = likedStrains
    ?.map((strain) => strain.strain_id)
    .filter((strain) => strain !== null) as string[];

  const { data: pairings, error } = await supabase.rpc(
    'get_strains_by_preference',
    {
      liked_strains: flattenedLikedStrains,
      limit_val: limit,
      offset_val: page * limit,
    },
  );

  if (error) {
    return { error, data: null };
  }

  return { data: pairings as unknown as Strain[], error: null };
}
