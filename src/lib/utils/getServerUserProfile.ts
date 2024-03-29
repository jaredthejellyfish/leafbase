import {
  type SupabaseClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { Database } from '@l/database';

export default async function getServerUserProfile(
  supabase?: SupabaseClient<Database>,
) {
  try {
    let client = supabase;
    if (!client) {
      const cookieStore = cookies();
      client = createServerComponentClient<Database>({
        cookies: () => cookieStore,
      });
    }

    const {
      data: { session },
      error,
    } = await client.auth.getSession();

    if (error ?? !session) {
      return { user: null, error };
    }

    const { data, error: profileError } = await client
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
