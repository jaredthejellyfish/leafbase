import { generateComponents } from '@uploadthing/react';

import type { LeafbaseFileRouter } from '@/app/api/uploadthing/core';

export const { UploadButton, UploadDropzone, Uploader } =
  // @ts-expect-error - I don't know how to fix this
  generateComponents<LeafbaseFileRouter>();
