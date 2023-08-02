import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const config = {
  matcher: ['^/profile$', '^/profile/.*', '^/$'],
};

export default withAuth(
  function middleware(req) {
    const url = new URL(req.url);
    const pathname = url.pathname;
    const baseUrl = url.origin;
    const search = new URLSearchParams(url.search).get('callbackUrl');

    if (!!req?.nextauth.token && pathname === '/auth/login')
      return NextResponse.redirect(search || `${baseUrl}/strains`);
  },

  {
    callbacks: {
      authorized: async ({ req, token }) => {
        const url = req?.url;
        const pathname = new URL(url).pathname;

        if (token) return true;

        // honor the wildcard matcher for all routes and stick to only exact matches so "/" doesn't match "/profile"
        if (config.matcher.some((route) => new RegExp(route).test(pathname))) {
          return false;
        }

        return true;
      },
    },
    pages: {
      verifyRequest: '/auth/verify-request',
      error: '/auth/error',
    },
  }
);
