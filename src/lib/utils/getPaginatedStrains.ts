import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { Database } from '@l/database';
import type { Strain } from '@l/types';

export async function getPaginatedStrains(
  filter: 're' | 'az' | 'za' | 'sr',
  page: number,
  limit = 12
) {
  const cookieStore = cookies();

  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const nameFilter = filter === 'za' ? false : true;

  const orderByLikes = filter && filter !== 're' ? false : true;

  const from = (page - 1) * limit;
  const to = from + limit;

  let query = supabase
    .from('strains')
    .select('*', { count: 'estimated', head: false });

  if (orderByLikes) {
    query = query.order('likes_count', { ascending: false });
  }

  query = query.order('name', { ascending: nameFilter }).range(from, to);

  const { data: strains, error, count } = await query.returns<Strain[]>();

  return { strains, count, error };
}
