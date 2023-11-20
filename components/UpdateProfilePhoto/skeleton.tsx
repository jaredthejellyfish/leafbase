import { CameraIcon } from 'lucide-react';
import React from 'react';

function UpdateProfilePhotoSkeleton() {
  return (
    <div className="absolute -top-4 -right-4">
      <input className="hidden" />

      <label
        className="cursor-pointer inline-block p-2 bg-green-700 text-white flex items-center justify-center rounded-full"
        htmlFor="fileInput"
      >
        <CameraIcon size={20} />
      </label>
    </div>
  );
}

export default UpdateProfilePhotoSkeleton;
