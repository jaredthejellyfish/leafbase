import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { PostgrestError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

import type { Database } from '@/lib//database';

type StrainLike = {
  id: string;
  created_at: string;
  strain_id: {
    name: string;
    nugImage: string;
    slug: string;
  };
};

export async function getServerLikedStrains(
  userId: string
): Promise<{ error: PostgrestError | null; data: StrainLike[] }> {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const { data: strainLikes, error: strainLikesError } = await supabase
    .from('public_strain_likes')
    .select(
      `
    id, created_at,
    strain_id (
      name,
      nugImage,
      slug
    )
  `
    )
    .eq('user_id', userId);

  return {
    error: strainLikesError,
    data: strainLikes as unknown as StrainLike[],
  };
}
