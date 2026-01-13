# Guida Migrazione: Koala → better-form

Questa guida spiega come migrare l'implementazione wizard custom di Koala alla libreria better-form.

## Perche Migrare?

| Aspetto | Koala Custom | better-form |
|---------|--------------|-------------|
| Manutenzione | Interna | Centralizzata, aggiornamenti automatici |
| Test | Da scrivere | 248+ test gia pronti |
| Documentazione | Interna | Pubblica, completa |
| Bug fix | Solo per Koala | Beneficio community |

## Compatibilita API

**98% compatibile** - Le API sono quasi identiche perche better-form nasce da Koala.

---

## Checklist Migrazione

### 1. Installazione

```bash
pnpm add @better_form/core
# Per Google Places address:
pnpm add better-form-plugin-google-places
```

### 2. Aggiornare gli Import

**Prima (Koala):**
```tsx
import { WizardContainer } from '@/components/wizard/WizardContainer';
import { WizardContext, useWizard } from '@/lib/context/WizardContext';
import type { WizardConfig, WizardField } from '@/lib/types/wizard-schema';
import { createCondition, andConditions } from '@/lib/wizard/conditional-logic';
import { commonValidations } from '@/lib/wizard/validation';
```

**Dopo (better-form):**
```tsx
import {
  WizardProvider,
  useWizard,
  createCondition,
  andConditions,
  commonValidations
} from '@better_form/core';
import type { WizardConfig, WizardField } from '@better_form/core';
```

### 3. Sostituire WizardContainer

**Prima:**
```tsx
<WizardContainer config={impiantoConfig}>
  {/* contenuto */}
</WizardContainer>
```

**Dopo:**
```tsx
import { koalaFieldComponents } from '@/components/wizard/fields';

<WizardProvider
  config={impiantoConfig}
  fieldComponents={koalaFieldComponents}
>
  <KoalaWizardContainer />
</WizardProvider>
```

### 4. Mapping Componenti

| Koala | better-form | Note |
|-------|-------------|------|
| `WizardContext` | `WizardProvider` | Rinominato |
| `useWizard()` | `useWizard()` | Identico |
| `WizardValidator` | Built-in | Automatico in WizardProvider |
| `ConditionalLogicEvaluator` | Built-in | Automatico |
| `createCondition()` | `createCondition()` | Identico |
| `andConditions()` | `andConditions()` | Identico |
| `orConditions()` | `orConditions()` | Identico |
| `commonValidations` | `commonValidations` | Identico |

### 5. Modifiche al Config

**Nessuna modifica necessaria per:**
- `steps`, `fieldGroups`, `fields`
- `showIf`, `hideIf`, `disabledIf`
- `validations`
- `onEnter`, `onExit`, `onChange`
- `onAddressSelected`, `onAddressDetailChange`
- `loadOptions`
- `transform`
- `width`

**Piccola modifica per blocking:**

```tsx
// Prima (Koala)
canProceed: () => "BLOCK_ASSISTED_REQUEST"

// Dopo (better-form)
canProceed: () => "BLOCK:Richiesta Assistita"
```

### 6. Field Components

I field components di Koala (`/components/wizard/fields/*`) funzionano con better-form senza modifiche, basta passarli via `fieldComponents`:

```tsx
// components/wizard/fields/index.ts
import { TextField } from './TextField';
import { SelectField } from './SelectField';
import { BooleanField } from './BooleanField';
// ... tutti gli altri

export const koalaFieldComponents = {
  text: TextField,
  email: TextField,
  tel: TextField,
  select: SelectField,
  boolean: BooleanField,
  'single-checkbox': SingleCheckboxField,
  radio: RadioField,
  textarea: TextareaField,
  multiselect: MultiSelectField,
  file: FileUploadField,
  address: AddressField,
  // ...
};
```

### 7. Custom WizardContainer

Koala puo mantenere il proprio `WizardContainer.tsx` che usa `useWizard()`:

```tsx
// components/wizard/KoalaWizardContainer.tsx
import { useWizard } from '@better_form/core';

export function KoalaWizardContainer() {
  const {
    currentStep,
    visibleSteps,
    formData,
    errors,
    nextStep,
    previousStep,
    // ... etc
  } = useWizard();

  // Il tuo rendering custom con shadcn/ui
  return (
    <div className="...">
      {/* KoalaStepIndicator, KoalaWizardStep, KoalaNavigation */}
    </div>
  );
}
```

---

## File da Modificare in Koala

| File | Modifica |
|------|----------|
| `package.json` | Aggiungere `@better_form/core` |
| `lib/types/wizard-schema.ts` | **Eliminare** - Usare tipi da better-form |
| `lib/context/WizardContext.tsx` | **Eliminare** - Usare WizardProvider |
| `lib/wizard/validation.ts` | **Eliminare** - Built-in |
| `lib/wizard/conditional-logic.ts` | **Eliminare** - Built-in |
| `components/wizard/fields/*.tsx` | **Mantenere** - Passare via fieldComponents |
| `components/wizard/WizardContainer.tsx` | **Mantenere** - Usa useWizard() |
| `components/wizard/WizardNavigation.tsx` | **Mantenere** |
| `components/wizard/WizardStepIndicator.tsx` | **Mantenere** |
| `lib/configs/wizard/*.config.ts` | Piccola modifica blocking pattern |

---

## Stima Effort

| Task | Ore |
|------|-----|
| Installazione e setup | 0.5 |
| Aggiornare import in config | 1 |
| Adattare blocking pattern | 0.5 |
| Creare export fieldComponents | 1 |
| Aggiornare WizardContainer | 2 |
| Eliminare file non piu necessari | 0.5 |
| Testing | 4 |
| **TOTALE** | **~10 ore** |

---

## Verifica

```bash
# 1. Build
pnpm build

# 2. Avviare dev
pnpm dev

# 3. Testare wizard impianto
# - Navigazione step
# - Campi condizionali
# - Validazione
# - Submit
```

---

## Supporto

Se trovi problemi durante la migrazione, apri una issue su:
https://github.com/GrandeVx/better-form/issues
