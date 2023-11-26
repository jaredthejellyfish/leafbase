'use server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database';

export async function updateUser(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase.auth.getSession();
  const session = data.session;

  if (!session || error) {
    return {
      status: null,
      error: 'No session',
    };
  }

  const name = formData.get('name') || session?.user.user_metadata.full_name;
  const username =
    formData.get('username') || session?.user.user_metadata.display_name;

  const phone = formData.get('phone') || session?.user.user_metadata.phone;
  const location =
    formData.get('location') || session?.user.user_metadata.location;

  const aboutMe =
    formData.get('aboutMe') || session?.user.user_metadata.aboutMe;

  const languages =
    formData.get('language') || session?.user.user_metadata.languages;

  const birthDate =
    formData.get('birthDate') || session?.user.user_metadata.birthDate;

  const newUserMetadata = {
    ...session.user.user_metadata,
    aboutMe,
    name,
    displayName: username,
    phone,
    location,
    languages,
    birthDate,
  };

  const { data: newUser, error: updateError } = await supabase.auth.updateUser({
    data: newUserMetadata,
  });

  if (!newUser || updateError) {
    return {
      status: null,
      error: 'Could not update user.',
    };
  }

  redirect('/profile?updated=true');
}
