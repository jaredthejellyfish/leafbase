import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const config = {
  matcher: ['/profile', '/profile/*'],
};

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      const url = req?.url;
      const pathname = new URL(url).pathname;

      if (token) return true;

      if (config.matcher.some((path) => pathname.match(path))) {
        return false;
      } else {
        return true;
      }
    },
  },
  pages: {
    signIn: '/auth/login',
    verifyRequest: '/auth/verify-request',
    error: '/auth/error',
  },
});
