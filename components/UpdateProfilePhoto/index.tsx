'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CameraIcon } from 'lucide-react';

import type { Database } from '@/lib/database';

export default function UpdateProfilePhoto({
  className,
}: {
  className?: string;
}) {
  const supabase = createClientComponentClient<Database>();
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function handleSubmit() {
      if (!file) {
        return;
      }

      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      const session = sessionData.session;

      if (sessionError) {
        console.error(sessionError);
        return;
      }

      const userId = session?.user.id;

      const formData = new FormData();
      formData.append('file', file);

      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}.${fileExt}`; // Generate random name
      const filePath = `${userId}/${fileName}`;

      const { data: existingFile, error: existingFileError } =
        await supabase.storage.from('profile_pictures').list(userId, {
          limit: 100,
          offset: 0,
        });

      if (!existingFileError && existingFile && existingFile.length > 0) {
        for (const file of existingFile) {
          const { error, data } = await supabase.storage
            .from('profile_pictures')
            .remove([`${userId}/${file.name}`]);

          console.log(`Removed file ${userId}/${data && data[0].name}`);
          console.log(error, data);
        }
      }

      const { error } = await supabase.storage
        .from('profile_pictures')
        .upload(filePath, file, {
          upsert: true,
        });

      if (error) {
        console.error(error);
        return;
      }

      const { data: newFileData } = supabase.storage
        .from('profile_pictures')
        .getPublicUrl(filePath);

      const newUserMetadata = {
        ...session?.user.user_metadata,
        image: newFileData.publicUrl,
      };

      console.log(newFileData.publicUrl);

      const { data: newUser, error: updateError } =
        await supabase.auth.updateUser({
          data: newUserMetadata,
        });

      if (updateError) {
        console.error(updateError);
        return;
      }

      if (newUser) {
        router.refresh();
      }
    }

    if (file) {
      handleSubmit();
    }
  }, [file, supabase, router]);

  return (
    <div className={className}>
      <input
        type="file"
        name="file"
        id="fileInput"
        onChange={(e) => {
          e.target.files && setFile(e.target.files[0]);
        }}
        className="hidden"
      />

      <label
        className="cursor-pointer inline-block p-2 bg-green-700 text-white flex items-center justify-center rounded-full"
        htmlFor="fileInput"
      >
        <CameraIcon size={20} />
      </label>
    </div>
  );
}