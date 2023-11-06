import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data } = await supabase.auth.getSession();

  const code = req.nextUrl.searchParams.get('code');

  if (code && req.nextUrl.pathname !== '/auth/callback') {
    return NextResponse.redirect(
      new URL(`/auth/callback?code=${code}`, req.nextUrl)
    );
  }

  if (!data.session && req.nextUrl.pathname !== '/auth/signin') {
    return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));
  }

  return res;
}

export const config = {
  matcher: ['/profile', '/profile/edit', '/profile/(.*)', '/'],
};
