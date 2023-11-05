import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database';
import type { Strain } from '@/lib/types';

export async function getServerPaginatedStrains({
  filter,
  page = 0,
  perPage,
}: {
  filter?: string | 're' | 'az' | 'za' | 'mr';
  page?: number;
  perPage: number;
}): Promise<{
  strains: Strain[] | null;
  count: number | null;
  nextPage: number;
  totalPages: number;
}> {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const offset = Math.max((page - 1) * perPage, 0);
  const { count: totalCount } = await supabase
    .from('public_strains')
    .select('*', { count: 'estimated', head: true });

  if (!totalCount) {
    console.error('No strains found');
    return {
      strains: [],
      nextPage: 0,
      count: 0,
      totalPages: 0,
    };
  }

  const totalPages = Math.ceil(totalCount / perPage);

  if (page > totalPages) {
    console.error('Page out of range');
    return {
      strains: [],
      nextPage: 0,
      count: 0,
      totalPages: 0,
    };
  }

  const nameFilter = filter === 'za' ? false : true;

  const orderByLikes = filter && filter !== 're' ? false : true;
  
  let query = supabase
    .from('public_strains')
    .select('*', { count: 'estimated', head: false });

  if (orderByLikes) {
    query = query.order('likes_count', { ascending: false });
  }

  query = query
    .order('name', { ascending: nameFilter })
    .range(offset, offset + perPage - 1);

  const { data: strains } = await query.returns<Strain[]>();

  return {
    strains,
    count: totalCount,
    nextPage: page + 1,
    totalPages,
  };
}
