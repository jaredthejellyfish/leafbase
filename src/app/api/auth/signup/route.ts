import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { geolocation } from '@vercel/edge';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import SignupSchema from '@l/schemas/SignupSchema';

import { env } from '@/env';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { city, country } = geolocation(request);

    const body = await request.json();
    const signupData = SignupSchema.safeParse(body);

    if (!signupData.success) {
      return new Response(JSON.stringify(signupData.error), {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      });
    }

    const supabase = createRouteHandlerClient({
      cookies: cookies,
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user)
      return NextResponse.json(
        { error: 'You are logged in.', success: false },
        { status: 400 },
      );

    const { data, error } = await supabase.auth.signUp({
      email: signupData.data.email,
      password: signupData.data.password,
      options: {
        emailRedirectTo:
          env.VERCEL_ENV === 'development'
            ? 'http://localhost:3000/'
            : env.VERCEL_URL,

        data: {
          username: signupData.data.username,
          location: city && country ? `${city}, ${country}` : null,
          name: signupData.data.name,
          birth_date: signupData.data.dateOfBirth,
        },
      },
    });

    if (error ?? !data)
      return NextResponse.json(
        {
          error: error ? error.message : 'Could not create user in DB.',
          success: false,
        },
        { status: 400 },
      );

    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: data.user?.id,
        username: signupData.data.username,
        location: city && country ? `${city}, ${country}` : null,
        name: signupData.data.name,
        birth_date: signupData.data.dateOfBirth,
      },
    ]);

    if (profileError) {
      console.error(profileError);
      await supabase.auth.signOut();
      return NextResponse.redirect('/auth/login');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message, success: false },
      { status: 500 },
    );
  }
}
