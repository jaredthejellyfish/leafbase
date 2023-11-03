'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { UTApi } from 'uploadthing/server';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database';

const utapi = new UTApi();

export async function uploadFiles(
  formData: FormData
): Promise<{ status: string }> {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const files = formData.getAll('files');
  try {
    const responses = await utapi.uploadFiles(files);

    // ensure all responses have a url

    for (const response of responses) {
      if (!response.data?.url) {
        console.error('No URL returned');
        return { status: 'No URL returned' };
      }
    }

    for (const response of responses) {
      if (!response.data?.url) {
        console.error('No URL returned');
        return { status: 'error' };
      }

      const strainId = response.data.name.split('.')[0];

      const { error } = await supabase
        .from('strains')
        .update({ nugImage: response.data.url })
        .eq('id', strainId);

      console.log('error', error);

      if (error || response.error) {
        return {
          status: (error?.message as string) || response.error || 'error',
        };
      }
    }
  } catch (err) {
    console.log('fd', formData.getAll('files'));
    console.error(err);
    
    return { status: err.message };
  }
  return { status: 'success' };
}

export async function deleteFiles() {
  const files = await utapi.listFiles();
  const fileKeys = files.map((file) => file.key);
  console.log('fileKeys', fileKeys);

  const responses = await utapi.deleteFiles(fileKeys);

  console.log('length, responses', fileKeys.length, responses);
  return { status: 'success' };
}
