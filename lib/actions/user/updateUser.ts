'use server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { z } from 'zod';

import type { UserMetadataExtended } from '@/lib/database/database_types';
import type { Database } from '@/lib/database';

// add a custom message to about that says: "This is a custom message"

const UserProfileSchema = z.object({
  about: z
    .string()
    .max(500, { message: 'About section must not exceed 500 characters.' }),
  name: z.string().max(30, { message: 'Name must not exceed 30 characters.' }),
  username: z
    .string()
    .max(30, { message: 'Username must not exceed 30 characters.' }),
  phone: z
    .string()
    .max(30, { message: 'Phone number must not exceed 30 characters.' }),
  location: z
    .string()
    .max(30, { message: 'Location must not exceed 30 characters.' }),
  language: z
    .string()
    .max(30, { message: 'Language must not exceed 30 characters.' }),
  birth_date: z.string(),
});

export async function updateUser(
  state: { error: null | string },
  formData: FormData
) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase.auth.getSession();
  const session = data.session;
  const currentMetadata = session?.user.user_metadata as UserMetadataExtended;

  if (!session || error) {
    return {
      error: 'No session',
    };
  }

  // ensure that formData is not null
  if (!formData) {
    return {
      error: 'No form data',
    };
  }

  const name: string =
    formData.get('name') || session?.user.user_metadata.full_name;

  const username: string =
    formData.get('username') || session?.user.user_metadata.username;

  const phone: string =
    formData.get('phone') || session?.user.user_metadata.phone;

  const location: string =
    formData.get('location') || session?.user.user_metadata.location;

  const about: string =
    formData.get('aboutMe') || session?.user.user_metadata.aboutMe;

  const language: string =
    formData.get('language') || session?.user.user_metadata.languages;

  const birth_date: string =
    formData.get('birthDate') || session?.user.user_metadata.birthDate;

  // validate form data and ensure it is different from current metadata
  try {
    UserProfileSchema.parse({
      about,
      name,
      username,
      phone,
      location,
      language,
      birth_date,
    });
  } catch (error) {
    const zodError = error as z.ZodError;
    const issues = zodError.issues.map((issue) => issue.message);
    return {
      error: issues[0] || 'Could not validate form data.',
    };
  }

  const newUserMetadata: UserMetadataExtended = {
    ...currentMetadata,
    about,
    name,
    username,
    phone,
    location,
    language,
    birth_date,
  };

  const { data: userMetatdataUpdated, error: updateError } =
    await supabase.auth.updateUser({
      data: newUserMetadata,
    });

  if (!userMetatdataUpdated || updateError) {
    return {
      error: 'Could not update user.',
    };
  }

  const { data: profileUpdated, error: profileError } = await supabase
    .from('profiles')
    .update({
      about,
      name,
      username,
      phone,
      location,
      language,
      birth_date,
    })
    .eq('id', session.user.id)
    .select();

  if (!profileUpdated || profileError) {
    return {
      error: 'Could not update profile.',
    };
  }

  revalidatePath('/profile');
  revalidatePath('/profile/edit');

  redirect('/profile?updated=true');
}
