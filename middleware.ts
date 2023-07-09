export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/', '/api', '/strains', '/profile'],
  pages: {
    signIn: '/auth/login',
    verifyRequest: '/auth/verify-request',
  },
};
