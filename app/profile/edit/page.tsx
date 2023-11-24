import { MdLocationPin } from 'react-icons/md';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';

import UpdateProfilePhotoSkeleton from '@/components/UpdateProfilePhoto/skeleton';
import { getServerUserMetadata } from '@/lib/utils/getServerUserMetadata';
import { updateUser } from '@/lib/actions/user/updateUser';
import NavBreadcrumbs from '@/components/NavBreadcrumbs';
import SubmitButton from '@/components/SubmitButton';
import TextAreaAuto from '@/components/TextAreaAuto';
import CloseButton from '@/components/CloseButton';

const UpdateProfilePhoto = dynamic(
  () => import('@/components/UpdateProfilePhoto'),
  {
    ssr: false,
    loading: () => <UpdateProfilePhotoSkeleton />,
  }
);

export const metadata = {
  title: 'Edit Profile - Leafbase',
};

export default async function ProfileEdit() {
  const { user_metadata, session } = await getServerUserMetadata();

  return (
    <div className="px-5 py-3 md:px-16">
      <NavBreadcrumbs
        urls={[
          { name: 'Profile', url: '/profile' },
          { name: 'Edit', url: '/profile/edit' },
        ]}
      />
      <form
        className="mt-3 flex flex-col gap-6 lg:flex-row"
        action={updateUser}
      >
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
            <div className="mt-2 text-lg font-bold ">
              <input
                className="rounded border border-zinc-500 bg-transparent px-0.5"
                name="name"
                placeholder={user_metadata?.name || 'Enter name'}
              />
            </div>

            <div className="flex flex-row items-center gap-1 text-sm text-zinc-300">
              <input
                className="mt-1 rounded border border-zinc-500 bg-transparent px-0.5"
                name="username"
                placeholder={user_metadata?.displayName || 'Enter username'}
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
                  placeholder={session?.user.phone || 'Enter phone number'}
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
        </div>
        <div id="vertical 2" className="flex flex-col gap-4 lg:w-2/3">
          <div className="flex w-full flex-col rounded-xl p-7 shadow-md dark:bg-zinc-900">
            <h1 className="text-xl font-bold">General information</h1>
            <span className="mt-3 text-sm dark:text-white">About me</span>
            <div className="mt-1 text-sm text-zinc-400 lg:w-4/5">
              <TextAreaAuto placeholder={user_metadata?.aboutMe} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
