import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: [
    './src/index.ts',
    './src/components/index.ts',
    './src/fields/index.ts',
    './src/hooks/index.ts',
    './src/themes/index.ts',
    './src/core/validation/index.ts',
    './src/core/conditional-logic/index.ts',
    './src/types/index.ts',
  ],
  format: 'esm',
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  unbundle: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  esbuildOptions: {
    banner: {
      js: '"use client";',
    },
  },
});
