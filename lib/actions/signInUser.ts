'use server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { z } from 'zod';

const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function signInUser(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return { status: null, error: 'Email and password are required.' };
  }

  const validated = SigninSchema.safeParse({ email, password });

  if (!validated.success) {
    return { status: null, error: validated.error.message };
  }

  await supabase.auth.signInWithPassword({
    email: validated.data.email,
    password: validated.data.password,
  });

  redirect('/profile');
}
