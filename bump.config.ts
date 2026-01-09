import { defineConfig } from 'bumpp';

export default defineConfig({
  files: ['packages/*/package.json'],
  commit: true,
  push: true,
  tag: true,
});
