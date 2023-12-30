import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const AUTH_CALLBACK_PATH = '/auth/callback';
const AUTH_SIGNIN_PATH = '/auth/signin';
const HOME_PATH = '/home';
const ROOT_PATH = '/';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data } = await supabase.auth.getSession();
  const currentUrl = req.nextUrl.pathname;

  const code = req.nextUrl.searchParams.get('code');
  if (code && currentUrl !== AUTH_CALLBACK_PATH) {
    const callbackUrl = new URL(
      `${AUTH_CALLBACK_PATH}?code=${code}&redirect=${currentUrl}`,
      req.nextUrl,
    );
    return NextResponse.redirect(callbackUrl);
  }

  if (!data.session && ![AUTH_SIGNIN_PATH, ROOT_PATH].includes(currentUrl)) {
    return NextResponse.redirect(new URL(AUTH_SIGNIN_PATH, req.nextUrl));
  }

  if (data.session && currentUrl === ROOT_PATH) {
    return NextResponse.redirect(new URL(HOME_PATH, req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile',
    '/profile/edit',
    '/profile/(.*)',
    '/',
    '/strain',
    '/home',
  ],
};
