import {
  type SupabaseClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { type NextRequest, NextResponse } from 'next/server';
import { UTApi } from 'uploadthing/server';
import { cookies } from 'next/headers';
import { promisify } from 'util'; // This is available in Node.js 16.0.0 and later
import { File } from 'buffer';
import fs from 'fs';

import type { Database } from '@/lib/database';

const readFile = promisify(fs.readFile);

async function readFileAndUpload({
  supabase,
  fileName,
}: {
  supabase: SupabaseClient<Database>;
  fileName: string;
}) {
  const folderPath = './clear-bg'; // Specify the path to your folder
  const filePath = `${folderPath}/${fileName}`;

  try {
    const fileData = await readFile(filePath);
    const strainId = fileName.split('.')[0];

    // Create a File object using the fs.promises.File constructor
    const file = new File([fileData], fileName, {
      type: 'application/octet-stream',
    });

    const utapi = new UTApi();
    // Perform further processing with 'file' here
    const response = await utapi.uploadFiles(file);

    if (!response.data?.url) {
      console.error('No URL returned');
      return;
    }

    const { error } = await supabase
      .from('strains')
      .update({ nugImage: response.data.url })
      .eq('id', strainId);

    console.error("error", error);
  } catch (error) {
    console.error('Error reading files:', error);
  }
}

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  const body = (await req.json()) as { fileName: string };
  await readFileAndUpload({ supabase, fileName: body.fileName });

  return NextResponse.json({ message: 'OK!' }, { status: 200 });
}
