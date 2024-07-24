import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/shared/core/app.ts',
    'src/shared/core/server.ts',
    'src/shared/core/websocketServer.ts',
  ],
  format: ['cjs', 'esm'],
  target: 'es2020',
  sourcemap: true,
  minify: false,
  loader: {
    '.prisma': 'text',
    '.toml': 'text',
    '.sql': 'text',
  },
  external: ['@snaplet/seed', '@snaplet/copycat'],
  splitting: false,
  clean: true,
});
