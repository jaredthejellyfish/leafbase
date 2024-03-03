import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '@l/database';
import type { StrainLike } from '@l/types';

export default async function getServerLikesByUserID(
  supabase: SupabaseClient<Database>,
  user_id?: string,
) {
  try {
    if (!user_id) return { likes: null, error: 'No user_id provided' };
    const { data: strainLikes, error: strainLikesError } = await supabase
      .from('strain_likes')
      .select(
        `
    id, created_at,
    strain_id (
      name,
      nugImage,
      slug,
      id
    )
  `,
      )
      .eq('user_id', user_id)
      .returns<StrainLike[]>();

    if (strainLikesError) return { likes: null, error: strainLikesError };
    return { likes: strainLikes, error: null };
  } catch (error) {
    return { likes: null, error };
  }
}
