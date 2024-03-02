import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';

import type { Database } from '../database';

export default async function getServerUserProfileByUsername(
  supabase: SupabaseClient<Database>,
  username: string,
) {
  try {
    const { data, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single();

    if (profileError) {
      return { user: null, error: profileError };
    }

    return { user: data, error: null };
  } catch (error) {
    return { user: null, error };
  }
}
