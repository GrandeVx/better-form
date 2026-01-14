<p align="center">
  <img src="https://raw.githubusercontent.com/GrandeVx/better-form/main/banner.png" alt="Better Form Logo"/>
  <h2 align="center">
    @better_form/core
  </h2>

  <p align="center">
    The most powerful form wizard library for React
    <br />
    <a href="https://better-form.eu"><strong>Learn more</strong></a>
    <br />
    <br />
    <a href="https://better-form.eu">Website</a>
    ·
    <a href="https://docs.better-form.eu">Documentation</a>
    ·
    <a href="https://github.com/GrandeVx/better-form/issues">Issues</a>
  </p>

[![npm](https://img.shields.io/npm/dm/@better_form/core?style=flat&colorA=000000&colorB=000000)](https://npm.chart.dev/@better_form/core)
[![npm version](https://img.shields.io/npm/v/@better_form/core.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@better_form/core)
[![GitHub stars](https://img.shields.io/github/stars/GrandeVx/better-form?style=flat&colorA=000000&colorB=000000)](https://github.com/GrandeVx/better-form/stargazers)
</p>

## About

Better Form is a schema-driven form wizard library for React. It provides multi-step forms, validation, conditional logic, and theming out of the box. Define complex forms with JSON configuration and let Better Form handle the rest—step navigation, field visibility, validation, and state management.

### Why Better Form

Building multi-step forms in React is tedious. Existing solutions like React Hook Form or Formik are great for simple forms, but wizards require manual step management, conditional logic, and progress tracking. Better Form solves this with a declarative JSON schema approach—define your form structure once, and everything works automatically.

## Installation

```bash
npm install @better_form/core
```

```bash
yarn add @better_form/core
```

```bash
pnpm add @better_form/core
```

## Quick Start

```tsx
import { WizardContainer, AutoStep, type WizardConfig } from '@better_form/core';
import '@better_form/core/styles';

const config: WizardConfig = {
  id: 'my-form',
  steps: [
    {
      id: 'personal',
      title: 'Personal Info',
      fields: [
        { id: 'name', type: 'text', label: 'Name', required: true },
        { id: 'email', type: 'email', label: 'Email', required: true },
      ],
    },
  ],
};

function MyForm() {
  return (
    <WizardContainer config={config} onSubmit={(data) => console.log(data)}>
      <AutoStep />
    </WizardContainer>
  );
}
```

## Features

- **Schema-Driven** - Define forms with JSON/TypeScript configuration
- **Multi-Step Wizard** - Built-in step management and progress tracking
- **Conditional Logic** - Show/hide fields and steps based on form values
- **Validation** - Required, patterns, min/max, and custom validators
- **Theming** - Full customization with CSS variables or theme presets
- **TypeScript** - Complete type safety with inference
- **Plugin System** - Extend with custom field types

## Subpath Exports

The package provides modular imports for better tree-shaking:

```tsx
import { WizardContainer, AutoStep } from '@better_form/core';
import { TextField, SelectField } from '@better_form/core/fields';
import { useWizard, useFormData } from '@better_form/core/hooks';
import { defaultTheme, darkTheme } from '@better_form/core/themes';
import { validateField } from '@better_form/core/validation';
import type { WizardConfig, WizardFieldConfig } from '@better_form/core/types';
```

## Documentation

Visit [docs.better-form.eu](https://docs.better-form.eu) for full documentation, guides, and API reference.

## Plugins

Extend Better Form with official plugins:

- [`@better_form/plugin-google-places`](https://www.npmjs.com/package/@better_form/plugin-google-places) - Google Places address autocomplete

## Contributing

Better Form is a free and open source project licensed under the [MIT License](https://github.com/GrandeVx/better-form/blob/main/LICENSE). You are free to do whatever you want with it.

You could help continuing its development by:

- [Contribute to the source code](https://github.com/GrandeVx/better-form/blob/main/CONTRIBUTING.md)
- [Suggest new features and report issues](https://github.com/GrandeVx/better-form/issues)

## License

MIT
