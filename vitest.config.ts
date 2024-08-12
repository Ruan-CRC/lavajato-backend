// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    // ...
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
});
