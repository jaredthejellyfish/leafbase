import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const config = {
  matcher: [
    '^/api/dispensaries/comment/.*$',
    '^/api/dispensaries/follow$',
    '^/api/dispensaries/followed$',
    '^/api/dispensaries/unfollow$',
    '^/api/dispensaries/add$',
    '^/api/recommendations/.*$',
    '^/api/strains/comment/.*$',
    '^/api/strains/like$',
    '^/api/strains/unlike$',
    '^/api/strains/liked$',
    '^/api/strains/mixers$',
    '^/api/users/delete$',
    '^/api/users/edit$',
    '^/api/email/dispensary/.*$',
    '^/users$',
    '^/profile$',
    '^/profile/.*',
    '^/$',
  ],
};

export default withAuth(
  function middleware(req) {
    const url = new URL(req.url);
    const pathname = url.pathname;
    const baseUrl = url.origin;
    const search = new URLSearchParams(url.search).get('callbackUrl');
    const error = new URLSearchParams(url.search).get('error');

    if (error && pathname === '/auth/login')
      return NextResponse.redirect(`${baseUrl}/auth/error?error=${error}`);

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
