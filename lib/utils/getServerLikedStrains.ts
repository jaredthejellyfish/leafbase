import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { AuthError, PostgrestError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

import type { Database } from '@/lib//database';
import type { StrainLike } from '@/lib/types';

function sortStrainsByName(strains: StrainLike[]): StrainLike[] {
  try {
    return strains.sort((a, b) => {
      const nameA = a.strain_id.name.toLowerCase();
      const nameB = b.strain_id.name.toLowerCase();

      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getServerLikedStrains(userId?: string): Promise<{
  error: PostgrestError | null | string | AuthError;
  data: StrainLike[] | undefined;
  likes: string[] | undefined;
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
      return {
        error: error || 'No session found',
        data: undefined,
        likes: undefined,
      };
    }

    user_id = session.user.id;
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
  `
    )
    .eq('user_id', user_id)
    .returns<StrainLike[]>();

  if (strainLikesError) {
    console.error(strainLikesError);
    return {
      error: strainLikesError,
      data: undefined,
      likes: undefined,
    };
  }

  const sortedStrains = sortStrainsByName(strainLikes);
  if (sortedStrains.length === 0) return { error: null, data: [], likes: [] };

  const likes = strainLikes?.map((strainLike) => strainLike.strain_id.id);

  return {
    error: strainLikesError,
    data: sortedStrains as unknown as StrainLike[],
    likes: likes,
  };
}
