import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const unauthorizedRedirects = [
  {
    matcher: '/profile',
    redirect: '/auth/signin',
  },
  {
    matcher: '/profile/(.*)',
    redirect: '/auth/signin',
  },
  {
    matcher: '/home',
    redirect: '/auth/signin',
  },
];

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
      req.nextUrl,
    );
    return NextResponse.redirect(callbackUrl);
  }

  const authPathMatchers = unauthorizedRedirects.map((r) => r.matcher);

  for (const matcher of authPathMatchers) {
    if (new RegExp(`^${matcher}$`).test(currentUrl)) {
      const redirect = unauthorizedRedirects.find((r) =>
        new RegExp(`^${r.matcher}$`).test(matcher),
      );
      if (redirect && !session) {
        return NextResponse.redirect(new URL(redirect.redirect, req.nextUrl));
      }
    }
  }

  return NextResponse.next();
}
