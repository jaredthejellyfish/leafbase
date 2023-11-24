import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '9wysjo',
  e2e: {},

  video: true,
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
