import { AiOutlineClose } from 'react-icons/ai';
import { MdLocationPin } from 'react-icons/md';
import Image from 'next/image';
import React from 'react';

import { getServerUserMetadata } from '@/lib/utils/getServerUserMetadata';
import NavBreadcrumbs from '@/components/NavBreadcrumbs';
import { updateUser } from '@/lib/actions/updateUser';

export const metadata = {
  title: 'Edit Profile - Leafbase',
};

async function EditPage() {
  const { user_metadata, session } = await getServerUserMetadata();

  return (
    <div className="px-5 md:px-16 py-3">
      <NavBreadcrumbs
        urls={[
          { name: 'Profile', url: '/profile' },
          { name: 'Edit', url: '/profile/edit' },
        ]}
      />
      <form
        className="flex flex-col gap-6 mt-3 lg:flex-row"
        action={updateUser}
      >
        <div id="vertical 1" className="flex flex-col gap-4 lg:w-1/3">
          <div className="relative z-0 flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
            <button aria-label="Stop editing">
              <AiOutlineClose size={20} className="absolute top-6 right-6" />
            </button>
            <Image
              src={
                user_metadata?.image || 'https://utfs.io/f/a2004ba7-e7b4-4153-bebc-058ce1393a59-mou0mx.png'
              }
              alt="profile"
              className="rounded-md"
              width={80}
              height={80}
            />
            <div className="mt-2 text-lg font-bold ">
              <input
                className="bg-transparent border rounded border-zinc-500 px-0.5"
                name="name"
                placeholder={user_metadata?.name || 'Enter name'}
              ></input>
            </div>

            <div className="flex flex-row items-center gap-1 text-sm text-zinc-300">
              <input
                className="bg-transparent border rounded border-zinc-500 px-0.5 mt-1"
                name="username"
                placeholder={user_metadata?.displayName || 'Enter username'}
              ></input>
            </div>
            <span className="mt-3 text-sm dark:text-white">
              Location:
              <span className="flex flex-row items-center gap-1 mt-1 text-sm cursor-pointer text-zinc-300">
                <MdLocationPin />
                <span className="text-zinc-400">{user_metadata?.location}</span>
              </span>
            </span>

            <span className="mt-4 text-sm dark:text-white">
              Email Address:
              <div className="text-gray-400">
                <input
                  className="bg-transparent border rounded border-zinc-500 px-0.5 w-60"
                  name="email"
                  placeholder={session?.user.email}
                ></input>
              </div>
            </span>
            <span className="mt-3 text-sm dark:text-white">
              Phone number:
              <div className="text-gray-400">
                <input
                  name="phone"
                  placeholder="Enter phone number"
                  type="text"
                  className="bg-transparent border rounded border-zinc-500 px-0.5 w-60"
                />
              </div>
            </span>
            <div className="flex h-fit">
              <button
                aria-label="Save"
                name="save"
                type="submit"
                className="w-1/2 mt-4 text-white bg-green-700 hover:bg-green-800 transition-all focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 mr-2 dark:bg-green-700 dark:hover:bg-green-800 focus:outline-none dark:focus:ring-blue-800"
              >
                Save
              </button>
              {/* <DeleteAccount /> */}
            </div>
          </div>
        </div>
        <div id="vertical 2" className="flex flex-col gap-4 lg:w-2/3">
          <div className="flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
            <h1 className="text-xl font-bold">General information</h1>
            <span className="mt-3 text-sm dark:text-white">About me</span>
            <div className="mt-1 text-sm text-zinc-400 lg:w-4/5">
              {/* <TextareaAutosize
                className="w-full p-1 bg-transparent border rounded border-zinc-500"
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
              ></TextareaAutosize> */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditPage;
