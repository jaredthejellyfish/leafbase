import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { PublicProfile } from '../database/database_types';
import type { Database } from '@/lib//database';

export async function getServerUserProfileFromUsername(
  displayName: string
): Promise<{
  status: 'success' | null;
  error: string | null;
  userProfile: PublicProfile | null;
}> {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const { data: user, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('displayName', displayName)
    .single();

  if (error) {
    return {
      status: null,
      error: 'Could not find user.',
      userProfile: null,
    };
  }

  return {
    status: 'success',
    error: null,
    userProfile: user,
  };
}
