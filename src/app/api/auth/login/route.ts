import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { email: string; password: string };

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  await supabase.auth.signInWithPassword({
    email: body.email,
    password: body.password,
  });

  redirect('/');
}

export const runtime = 'edge';
