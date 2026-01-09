# Better Form

A powerful, schema-driven form wizard library for React. Build complex multi-step forms with JSON configuration, conditional logic, validation, and theming support.

## Features

- **Schema-Driven**: Define forms with JSON configuration
- **Multi-Step Wizard**: Built-in step management and navigation
- **Conditional Logic**: Show/hide fields based on form values
- **Validation**: Comprehensive validation with custom rules
- **Theming**: Full theme customization with CSS variables
- **TypeScript**: Full TypeScript support with type inference
- **Extensible**: Register custom field components
- **Auto-Save**: Optional localStorage/custom storage persistence

## Installation

```bash
npm install better-form
# or
yarn add better-form
# or
pnpm add better-form
```

## Quick Start

```tsx
import {
  WizardContainer,
  AutoStep,
  type WizardConfig,
} from 'better-form';

// Define your form configuration
const config: WizardConfig = {
  id: 'registration-form',
  steps: [
    {
      id: 'personal',
      title: 'Informazioni Personali',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Nome',
          required: true,
          placeholder: 'Inserisci il tuo nome',
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email',
          required: true,
          validation: [{ type: 'email', message: 'Email non valida' }],
        },
      ],
    },
    {
      id: 'preferences',
      title: 'Preferenze',
      fields: [
        {
          id: 'newsletter',
          type: 'boolean',
          label: 'Newsletter',
          checkboxLabel: 'Desidero ricevere la newsletter',
        },
        {
          id: 'category',
          type: 'select',
          label: 'Categoria',
          options: [
            { value: 'personal', label: 'Personale' },
            { value: 'business', label: 'Business' },
          ],
        },
      ],
    },
  ],
};

function MyForm() {
  const handleSubmit = async (data: Record<string, unknown>) => {
    console.log('Form data:', data);
    // Submit to API
  };

  return (
    <WizardContainer
      config={config}
      onSubmit={handleSubmit}
    >
      <AutoStep />
    </WizardContainer>
  );
}
```

## Field Types

Better Form includes many built-in field types:

### Text Fields
- `text` - Standard text input
- `email` - Email with validation
- `password` - Password input with toggle
- `phone` / `tel` - Phone number input
- `url` - URL input
- `textarea` - Multi-line text

### Selection Fields
- `select` - Dropdown select
- `multiselect` - Multiple selection
- `searchable` - Searchable dropdown
- `radio` - Radio button group
- `radio-cards` - Radio as clickable cards
- `checkboxes` - Checkbox group
- `checkbox-cards` - Checkboxes as cards
- `chips` - Tag/chip selection

### Boolean Fields
- `boolean` / `checkbox` - Single checkbox
- `switch` / `toggle` - Toggle switch
- `terms` - Accept terms checkbox

### Number Fields
- `number` - Numeric input
- `range` / `slider` - Range slider
- `currency` - Currency input
- `percentage` - Percentage input

### Date/Time Fields
- `date` - Date picker
- `time` - Time picker
- `datetime` - Date and time
- `month` - Month picker
- `date-range` - Date range

### File Fields
- `file` - File upload with drag & drop
- `image` - Image upload with preview
- `document` - Document upload

### Special Fields
- `hidden` - Hidden field
- `readonly` - Read-only display

## Conditional Logic

Show or hide fields based on other field values:

```tsx
const config: WizardConfig = {
  id: 'conditional-form',
  steps: [
    {
      id: 'main',
      fields: [
        {
          id: 'hasCompany',
          type: 'boolean',
          label: 'Hai una azienda?',
        },
        {
          id: 'companyName',
          type: 'text',
          label: 'Nome Azienda',
          // Only show when hasCompany is true
          showIf: {
            field: 'hasCompany',
            operator: 'equals',
            value: true,
          },
        },
      ],
    },
  ],
};
```

### Condition Helpers

```tsx
import {
  equals,
  notEquals,
  greaterThan,
  contains,
  isEmpty,
  andConditions,
  orConditions,
} from 'better-form';

// Simple condition
const showIfAdult = equals('age', 18);

// Combined conditions (AND)
const showIfAdultFromItaly = andConditions(
  greaterThan('age', 18),
  equals('country', 'IT')
);

// Combined conditions (OR)
const showIfAdminOrModerator = orConditions(
  equals('role', 'admin'),
  equals('role', 'moderator')
);
```

## Validation

### Built-in Validators

```tsx
import { commonValidations } from 'better-form';

const field = {
  id: 'email',
  type: 'email',
  validation: [
    commonValidations.required('Email obbligatoria'),
    commonValidations.email('Email non valida'),
    commonValidations.maxLength(100, 'Massimo 100 caratteri'),
  ],
};
```

### Available Validators

- `required(message)` - Field is required
- `email(message)` - Valid email format
- `minLength(n, message)` - Minimum length
- `maxLength(n, message)` - Maximum length
- `min(n, message)` - Minimum number value
- `max(n, message)` - Maximum number value
- `pattern(regex, message)` - Regex pattern
- `url(message)` - Valid URL
- `phone(message)` - Valid phone number
- `custom(fn, message)` - Custom validation function

### Custom Validation

```tsx
const field = {
  id: 'username',
  type: 'text',
  validation: [
    {
      type: 'custom',
      validator: (value, formData) => {
        if (value && value.includes(' ')) {
          return 'Username non può contenere spazi';
        }
        return null;
      },
    },
  ],
};
```

## Theming

### Using Presets

```tsx
import { WizardContainer, themePresets } from 'better-form';

<WizardContainer
  config={config}
  theme={themePresets.dark}
  onSubmit={handleSubmit}
>
  <AutoStep />
</WizardContainer>
```

### Custom Theme

```tsx
import { createTheme } from 'better-form';

const myTheme = createTheme({
  colors: {
    primary: '#6366f1',
    primaryHover: '#4f46e5',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f8fafc',
  },
  borderRadius: {
    md: '12px',
  },
});

<WizardContainer config={config} theme={myTheme} onSubmit={handleSubmit}>
  <AutoStep />
</WizardContainer>
```

### Theme Presets

- `themePresets.light` - Light theme (default)
- `themePresets.dark` - Dark theme
- `themePresets.modern` - Modern with purple accent

## Custom Field Components

Register custom field components:

```tsx
import type { FieldComponentProps } from 'better-form';

// Custom address field
function AddressField({ field, value, onChange, error }: FieldComponentProps) {
  const address = (value as { street?: string; city?: string }) || {};

  return (
    <div className="address-field">
      <input
        placeholder="Via"
        value={address.street || ''}
        onChange={(e) => onChange({ ...address, street: e.target.value })}
      />
      <input
        placeholder="Città"
        value={address.city || ''}
        onChange={(e) => onChange({ ...address, city: e.target.value })}
      />
    </div>
  );
}

// Register in WizardContainer
<WizardContainer
  config={config}
  fieldComponents={{
    address: AddressField,
  }}
  onSubmit={handleSubmit}
>
  <AutoStep />
</WizardContainer>
```

## useWizard Hook

Access wizard state and actions from any component:

```tsx
import { useWizard } from 'better-form';

function CustomNavigation() {
  const {
    currentStepIndex,
    visibleSteps,
    nextStep,
    previousStep,
    canGoNext,
    state,
    setFieldValue,
  } = useWizard();

  return (
    <div>
      <p>Step {currentStepIndex + 1} di {visibleSteps.length}</p>
      <button onClick={previousStep}>Indietro</button>
      <button onClick={nextStep} disabled={!canGoNext}>
        Avanti
      </button>
    </div>
  );
}
```

## Storage / Auto-Save

Enable auto-save to localStorage or custom storage:

```tsx
// localStorage (default)
<WizardContainer
  config={config}
  storage={{ enabled: true, key: 'my-form-data' }}
  onSubmit={handleSubmit}
>
  <AutoStep />
</WizardContainer>

// Custom storage adapter
const customStorage = {
  getItem: async (key: string) => {
    return await myDatabase.get(key);
  },
  setItem: async (key: string, value: string) => {
    await myDatabase.set(key, value);
  },
  removeItem: async (key: string) => {
    await myDatabase.delete(key);
  },
};

<WizardContainer
  config={config}
  storage={{ enabled: true, key: 'my-form', adapter: customStorage }}
  onSubmit={handleSubmit}
>
  <AutoStep />
</WizardContainer>
```

## API Reference

### WizardContainer Props

| Prop | Type | Description |
|------|------|-------------|
| `config` | `WizardConfig` | Form configuration (required) |
| `initialData` | `Record<string, unknown>` | Initial form values |
| `theme` | `BetterFormTheme` | Custom theme |
| `storage` | `StorageOptions` | Auto-save configuration |
| `fieldComponents` | `FieldComponentsMap` | Custom field components |
| `onSubmit` | `(data) => Promise<void>` | Submit handler |
| `onStepChange` | `(stepIndex, stepId) => void` | Step change callback |
| `onFieldChange` | `(fieldId, value, data) => void` | Field change callback |
| `onValidationError` | `(errors) => void` | Validation error callback |
| `onNavigate` | `(path) => void` | Navigation callback |
| `onNotify` | `(type, message) => void` | Notification callback |
| `blockingDialog` | `ReactNode` | Blocking dialog component |

### WizardConfig

```typescript
interface WizardConfig {
  id: string;
  steps: WizardStep[];
  submitButtonText?: string;
  nextButtonText?: string;
  prevButtonText?: string;
}

interface WizardStep {
  id: string;
  title?: string;
  description?: string;
  fields: WizardField[];
  showIf?: ConditionalLogic;
  hideIf?: ConditionalLogic;
}

interface WizardField {
  id: string;
  type: WizardFieldType;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  validation?: ValidationRule[];
  showIf?: ConditionalLogic;
  hideIf?: ConditionalLogic;
  options?: FieldOption[];
  // ... other type-specific props
}
```

## License

MIT
