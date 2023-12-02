'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CameraIcon } from 'lucide-react';

import type { Database } from '@/lib/database';
import { toast } from '../ui/use-toast';

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

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error(sessionError);
        return;
      }

      if (!session || !session.user || !session.user.id) {
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
          await supabase.storage
            .from('profile_pictures')
            .remove([`${userId}/${file.name}`])
            .finally(() => {
              toast({
                title: 'Profile picture updated',
                description: 'Your profile picture has been updated.',
              });
            });
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

      const { data: newUser, error: updateError } =
        await supabase.auth.updateUser({
          data: newUserMetadata,
        });

      if (updateError) {
        console.error(updateError);
        return;
      }

      const { error: updateProfileError } = await supabase
        .from('profiles')
        .update({
          image: newFileData.publicUrl,
        })
        .eq('id', session?.user.id);

      if (updateProfileError) {
        console.error(updateProfileError);
        return;
      }
      if (newUser) {
        router.refresh();
        setFile(null);
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
        className="flex cursor-pointer items-center justify-center rounded-full bg-green-700 p-2 text-white"
        htmlFor="fileInput"
      >
        <CameraIcon size={20} />
      </label>
    </div>
  );
}
