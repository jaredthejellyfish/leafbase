import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { Database } from '@/lib/database';

export async function GET() {
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookies(),
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return NextResponse.json(
    { connections: user?.app_metadata.providers },
    { status: 200 },
  );
}

export const runtime = 'edge';
