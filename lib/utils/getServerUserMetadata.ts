import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Session } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database';

import type { UserMetadataExtended } from '../database/database_types';

export async function getServerUserMetadata(session?: boolean) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  const userSession = sessionData?.session;

  if (!userSession || sessionError) {
    await supabase.auth.refreshSession();
  }

  if (userSession || session) {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    return {
      session: userSession as Session,
      user_metadata: (user?.user_metadata as UserMetadataExtended) || null,
      app_metadata: user?.app_metadata || null,
      id: (user?.id as string) || (sessionData.session?.user.id as string),
    };
  }

  return { session: null, user_metadata: null, id: null };
}
