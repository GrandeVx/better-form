# Demo Projects

This folder contains standalone demo projects showcasing how to use `@better_form/core` in different scenarios.

## Structure

```
demo/
├── nextjs-basic/       # Basic Next.js integration (coming soon)
├── react-vite/         # React + Vite setup (coming soon)
├── remix/              # Remix integration (coming soon)
└── with-plugins/       # Demo with plugins (coming soon)
```

## Running a Demo

Each demo is a standalone project. To run one:

```bash
cd demo/<project-name>
pnpm install
pnpm dev
```

## Creating a New Demo

1. Create a new folder in `demo/`
2. Initialize a new project
3. Add `@better_form/core` as a dependency:
   ```json
   {
     "dependencies": {
       "@better_form/core": "workspace:*"
     }
   }
   ```
4. Add the demo to `pnpm-workspace.yaml` (already configured with `demo/*`)
