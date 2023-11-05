import { generateComponents } from '@uploadthing/react';

import type { LeafbaseFileRouter } from '@/app/api/uploadthing/core';

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<LeafbaseFileRouter>();
