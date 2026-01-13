# @better_form/core

## 0.2.0-beta.1

### Minor Changes

- Auto-generate field ID from name

  - Fields now automatically get their `id` set from `name` if not explicitly provided
  - Improves DX by allowing users to only specify `name` in field configuration
  - Fix: Handle title object in metadata to prevent [object Object] display

## 0.2.0-beta.0

### Minor Changes

- c6e5264: Initial beta release

  - Multi-step wizard forms with JSON configuration
  - Built-in validation (required, minLength, maxLength, pattern, custom)
  - Conditional logic for fields and steps (showIf/hideIf)
  - Theming system with CSS variables
  - Plugin system for extensibility
  - Google Places address autocomplete plugin
  - Full TypeScript support
