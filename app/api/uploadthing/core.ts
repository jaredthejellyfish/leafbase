import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();
// Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const leafbaseFileRouter = {
  strainImageUploader: f({ image: { maxFileSize: '4MB' } }).onUploadComplete(
    async ({ file }) => {
      console.log('file url', file.url);
    }
  ),
} satisfies FileRouter;

export type LeafbaseFileRouter = typeof leafbaseFileRouter;
