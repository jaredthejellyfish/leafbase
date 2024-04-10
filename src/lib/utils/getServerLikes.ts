import type { SupabaseClient, User } from '@supabase/supabase-js';

import type { Database } from '@l/database';
import type { StrainLike } from '@l/types';

export default async function getServerLikes(
  supabase: SupabaseClient<Database>,
  user?: User,
) {
  try {
    if (!user) {
      return { likes: null, error: 'No session' };
    }
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
      .eq('user_id', user.id)
      .returns<StrainLike[]>();

    if (strainLikesError) return { likes: null, error: strainLikesError };
    return { likes: strainLikes, error: null };
  } catch (error) {
    return { likes: null, error };
  }
}
