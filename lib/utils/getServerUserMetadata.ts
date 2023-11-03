import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database';

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

  if (userSession && session) {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    return { session: userSession, user_metadata: user?.user_metadata };
  }
  if (userSession && !session) {
    return { user_metadata: userSession.user.user_metadata };
  }

  return { user_metadata: null };
}
