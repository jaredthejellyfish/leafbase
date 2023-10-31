import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

const auth = (req: Request) => ({ id: 'fakeId' }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const leafbaseFileRouter = {
  strainImageUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(({ req }) => {
      return auth(req);
    })
    .onUploadComplete(async ({ file }) => {
      console.log('file url', file.url);
    }),
} satisfies FileRouter;

export type LeafbaseFileRouter = typeof leafbaseFileRouter;
