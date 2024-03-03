import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { kv } from '@vercel/kv';
import { cookies } from 'next/headers';

import type { Database } from '@l/database';

export async function getServerOrder() {
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookies(),
  });

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError ?? !session) {
    return { error: sessionError, order: null };
  }

  const order = await kv.get(`what-to-otder-${session.user.id}`);

  return { order: (order as string) ?? null, error: null };
}
