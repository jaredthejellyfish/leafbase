import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import type { MiddlewareRedirects } from '@l/types';

const authRedirects: MiddlewareRedirects = [
  {
    matcher: '/profile',
    redirect: '/auth/login',
    isAuth: false,
  },
  {
    matcher: '/profile/(.*)',
    redirect: '/auth/login',
    isAuth: false,
  },
  {
    matcher: '/home',
    redirect: '/auth/login',
    isAuth: false,
  },
  {
    matcher: '/',
    redirect: '/home',
    isAuth: true,
  },
  {
    matcher: '/auth/(.*)',
    redirect: '/profile',
    isAuth: true,
  },
];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const currentUrl = req.nextUrl.pathname;

  const code = req.nextUrl.searchParams.get('code');
  if (code && currentUrl !== '/auth/callback') {
    const callbackUrl = new URL(
      `/auth/callback?code=${code}&redirect=${currentUrl}`,
      req.nextUrl.toString(),
    );
    return NextResponse.redirect(callbackUrl);
  }

  for (const path of authRedirects) {
    if (new RegExp(`^${path.matcher}$`).test(currentUrl)) {
      const redirect = authRedirects.find((r) =>
        new RegExp(`^${r.matcher}$`).test(path.matcher),
      );
      if (redirect && !session && !redirect.isAuth) {
        return NextResponse.redirect(
          new URL(redirect.redirect, req.nextUrl.toString()),
        );
      }
      if (redirect && session && redirect.isAuth) {
        return NextResponse.redirect(
          new URL(redirect.redirect, req.nextUrl.toString()),
        );
      }
    }
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
