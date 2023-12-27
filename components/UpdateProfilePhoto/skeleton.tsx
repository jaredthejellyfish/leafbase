import { CameraIcon } from 'lucide-react';

import React from 'react';

function UpdateProfilePhotoSkeleton() {
  return (
    <div className="absolute -right-4 -top-4">
      <input className="hidden" />

      <label
        className="flex cursor-pointer items-center justify-center rounded-full bg-green-700 p-2 text-white"
        htmlFor="fileInput"
      >
        <CameraIcon size={20} />
      </label>
    </div>
  );
}

export default UpdateProfilePhotoSkeleton;
