'use server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database';
import { redirect } from 'next/navigation';


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

  const newUserMetadata = {
      ...session.user.user_metadata,
    name,
    displayName: username,
    phone,
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

 redirect('/profile')
}
