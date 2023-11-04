import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data } = await supabase.auth.getSession();

  if (!data.session && req.nextUrl.pathname !== '/auth/signin') {
    return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));
  }

  return res
}

export const config = {
  matcher: ['/profile', '/profile/edit'],
};