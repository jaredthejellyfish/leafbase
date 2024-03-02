import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { Database } from '../database';
import type { StrainWithComments } from '../types';

export async function getServerStrain(slug: string) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const { data: strain } = await supabase
    .from('strains')
    .select(
      '*, strain_comments ( *, profile:profiles ( username, image ), comment_likes:strain_comment_likes ( user_id, id ) )',
    )
    .eq('slug', slug)
    .returns<StrainWithComments[]>()
    .maybeSingle();

  return strain;
}
