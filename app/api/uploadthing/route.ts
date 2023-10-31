import { createNextRouteHandler } from 'uploadthing/next';

import { leafbaseFileRouter } from './core';

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: leafbaseFileRouter,
});
