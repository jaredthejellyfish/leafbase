'use client';

import type { Session } from '@supabase/auth-helpers-nextjs';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useFormState } from 'react-dom';
import { MdLocationPin } from 'react-icons/md';

import CloseButton from '@/components/CloseButton';
import SubmitButton from '@/components/SubmitButton';
import UpdateProfilePhotoSkeleton from '@/components/UpdateProfilePhoto/skeleton';

import { updateUser } from '@/lib/actions/user/updateUser';
import type { UserMetadataExtended } from '@/lib/database/database_types';

import LoginConnections from '../LoginConnections';
import TextAreaAuto from '../TextAreaAuto';
import { toast } from '../ui/use-toast';

import React, { useEffect } from 'react';

type Props = {
  user_metadata: UserMetadataExtended;
  session: Session;
  providers: string[];
};

const UpdateProfilePhoto = dynamic(
  () => import('@/components/UpdateProfilePhoto'),
  {
    ssr: false,
    loading: () => <UpdateProfilePhotoSkeleton />,
  },
);

const LanguageSelect = dynamic(() => import('@/components/LanguageSelect'));
const DatePicker = dynamic(() => import('@/components/DatePicker'));

function EditProfileForm({ user_metadata, session, providers }: Props) {
  // @ts-expect-error - useFormState is not typed properly yet as it is a React canary feature
  const [state, formAction] = useFormState(updateUser, {
    error: null,
  });

  useEffect(() => {
    if (state.error !== null) {
      toast({
        title: 'Error',
        description: state.error,
      });
    }
  }, [state]);

  return (
    <form className="mt-3 flex flex-col gap-6 lg:flex-row" action={formAction}>
      <div id="vertical 1" className="flex flex-col gap-4 lg:w-1/3">
        <div className="relative z-0 flex w-full flex-col rounded-xl p-7 shadow-md dark:bg-zinc-900">
          <CloseButton />
          <div className="relative w-20">
            <Image
              src={
                user_metadata?.image ||
                'https://utfs.io/f/a2004ba7-e7b4-4153-bebc-058ce1393a59-mou0mx.png'
              }
              alt="profile"
              className="rounded-md"
              width={80}
              height={80}
              unoptimized
            />
            <UpdateProfilePhoto className="absolute -right-4 -top-4" />
          </div>
          <div className="mt-1.5 flex gap-y-1 text-lg font-bold md:flex-row lg:flex-col xl:flex-row">
            <input
              className="mr-2 rounded border border-zinc-500 bg-transparent px-0.5"
              name="name"
              placeholder={user_metadata?.name || 'Enter name'}
            />
            <input
              className="w-1/3 rounded border border-zinc-500 bg-transparent px-0.5 text-sm xl:w-1/3"
              name="pronouns"
              placeholder={user_metadata?.pronouns || 'Pronouns'}
            />
          </div>

          <div className="flex flex-row items-center gap-1 text-sm text-zinc-300">
            <span>@</span>
            <input
              className="mt-1 rounded border border-zinc-500 bg-transparent px-0.5"
              name="username"
              placeholder={user_metadata?.username || 'Enter username'}
            />
          </div>
          <span className="mt-2 text-sm dark:text-white">
            Location:
            <span className="flex cursor-pointer flex-row items-center gap-1 text-sm text-zinc-300">
              <MdLocationPin />
              <input
                className="mt-1 rounded border border-zinc-500 bg-transparent px-0.5"
                name="location"
                placeholder={user_metadata?.location || 'Enter location'}
              />
            </span>
          </span>

          <span className="mt-3 text-sm dark:text-white">
            Email Address:
            <div className="text-gray-400">
              <input
                className="w-60 rounded border border-zinc-500 bg-transparent px-0.5"
                name="email"
                placeholder={session?.user.email}
              />
            </div>
          </span>
          <span className="mt-3 text-sm dark:text-white">
            Phone number:
            <div className="text-gray-400">
              <input
                name="phone"
                placeholder={user_metadata?.phone || 'Enter phone number'}
                type="text"
                className="w-60 rounded border border-zinc-500 bg-transparent px-0.5"
              />
            </div>
          </span>
          <div className="flex h-fit w-full">
            <SubmitButton
              text="Save"
              id="submit-edit-profile"
              whilePending="Saving..."
            />
          </div>
        </div>
        <LoginConnections providers={providers} />
      </div>
      <div id="vertical 2" className="flex flex-col gap-4 lg:w-2/3">
        <div className="flex w-full flex-col rounded-xl p-7 shadow-md dark:bg-zinc-900">
          <h1 className="text-xl font-bold">General information</h1>
          <span className="mt-3 text-sm dark:text-white">About me</span>
          <div className="mt-1 text-sm text-zinc-400 lg:w-4/5">
            <TextAreaAuto placeholder={user_metadata?.about} />
          </div>

          <span className="mt-3 text-sm dark:text-white">
            Birthday:
            <div className="mt-1">
              <DatePicker initialDate={user_metadata?.birth_date} />
            </div>
          </span>

          <span className="mt-3 text-sm dark:text-white">
            Language:
            <div className="mt-1">
              <LanguageSelect initialLanguage={user_metadata?.language} />
            </div>
          </span>
        </div>
      </div>
    </form>
  );
}

export default EditProfileForm;
