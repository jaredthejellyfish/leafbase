import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';

import type { Database } from '@l/database';

export default async function getServerUserProfile(
  supabase: SupabaseClient<Database>,
) {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error ?? !session) {
      return { user: null, error };
    }

    const { data, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (profileError) {
      return { user: null, error: profileError };
    }

    return { user: data, session, error };
  } catch (error) {
    return { user: null, error };
  }
}
