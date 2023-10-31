import { UploadDropzone } from '@uploadthing/react';
import { LogOut } from 'lucide-react';
import React from 'react';

import type { LeafbaseFileRouter } from './api/uploadthing/core';

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-0 mt-2 mb-4 border shadow-sm dark:bg-neutral-500/10 border-neutral-200 dark:border-transparent rounded-xl">
        <form
          action="//auth/signout"
          method="post"
          className="flex flex-row items-center px-3 py-2 text-sm"
        >
          <LogOut className="w-5 h-6 mr-3 text-lcoin" />

          <button
            className="dark:text-neutral-100 text-neutral-700"
            type="submit"
          >
            Sign out
          </button>
        </form>
      </div>
      <UploadDropzone<LeafbaseFileRouter> endpoint="strainImageUploader" />
    </main>
  );
}
