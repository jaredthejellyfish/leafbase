'use server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database';

export async function likeStrain(liked: boolean, strain_id: string) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase.auth.getSession();
  const session = data.session;

  if (error || !session) {
    console.error(error || 'No session found');
    return;
  }

  const user_id = session.user.id;

  if (!strain_id || !user_id) {
    console.error('Invalid like arguments');
    return;
  }

  const { data: existingLike, error: existingLikeError } = await supabase
    .from('public_strain_likes')
    .select('id')
    .eq('user_id', user_id)
    .eq('strain_id', strain_id);

  if (liked === true && !existingLikeError && !existingLike?.length) {
    const { error } = await supabase
      .from('public_strain_likes')
      .insert([{ user_id, strain_id }]);

    if (error) {
      console.error(error || 'No like data returned');
      return;
    }
  }

  if (liked === false && !existingLikeError && existingLike?.length) {
    const { error } = await supabase
      .from('public_strain_likes')
      .delete()
      .eq('user_id', user_id)
      .eq('strain_id', strain_id);

    if (error) {
      console.error(error || 'No like data returned');
      return;
    }
  }

  revalidatePath('/strains');
  revalidatePath(`/strains/${strain_id}`);
  revalidatePath('/profile');
}
