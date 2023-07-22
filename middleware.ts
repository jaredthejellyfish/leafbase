export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/', '/api', '/profile'],
  pages: {
    signIn: '/auth/login',
    verifyRequest: '/auth/verify-request',
  },
};
