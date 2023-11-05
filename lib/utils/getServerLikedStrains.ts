import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { AuthError, PostgrestError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

import type { Database } from '@/lib//database';
import type { StrainLike } from '@/lib/types';

function sortStrainsByName(strains: StrainLike[]): StrainLike[] {
  return strains.sort((a, b) => {
    const nameA = a.strain_id.name.toLowerCase();
    const nameB = b.strain_id.name.toLowerCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
}

export async function getServerLikedStrains(userId?: string): Promise<{
  error: PostgrestError | null | string | AuthError;
  data: StrainLike[];
}> {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  let user_id = userId;

  if (!user_id) {
    const { data, error } = await supabase.auth.getSession();
    const session = data.session;

    if (error || !session) {
      console.error(error || 'No session found');
      return {
        error: error || 'No session found',
        data: [],
      };
    }

    user_id = session.user.id;
  }

  const { data: strainLikes, error: strainLikesError } = await supabase
    .from('public_strain_likes')
    .select(
      `
    id, created_at,
    strain_id (
      name,
      nugImage,
      slug,
      id
    )
  `
    )
    .eq('user_id', user_id)
    .returns<StrainLike[]>();

  if (strainLikesError) {
    console.error(strainLikesError);
    return {
      error: strainLikesError,
      data: [],
    };
  }

  const sortedStrains = sortStrainsByName(strainLikes);

  return {
    error: strainLikesError,
    data: sortedStrains as unknown as StrainLike[],
  };
}
