# Pet Registration Demo 🐾

A fun, interactive demo showcasing the power of **better-form** - a React form wizard library.

## Features Demonstrated

This demo showcases all the key features of `@better_form/core`:

| Feature | Description |
|---------|-------------|
| **Multi-step wizard** | 6 steps with smooth navigation |
| **Conditional fields** | Different fields shown based on pet type |
| **Conditional steps** | Health step shown only if birth date is provided |
| **Nested conditions** | Microchip number shown only if has microchip |
| **Validation** | Required fields, email pattern, microchip format |
| **Theming** | Custom POP style with animations |

## Wizard Flow

```
Step 1: Pet Type Selection
    ↓
Step 2: Basic Info (name, birth date, sex, neutered)
    ↓
Step 3: Specific Details (different for each pet type)
    ↓
Step 4: Health Info (conditional - only if birth date provided)
    ↓
Step 5: Owner Information
    ↓
Step 6: Summary & Confirmation
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Navigate to the demo folder
cd examples/pet-registration

# Install dependencies (downloads @better_form/core from npm!)
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the demo.

## Tech Stack

- **Next.js 15** - React framework
- **@better_form/core** - Form wizard library (from npm)
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **canvas-confetti** - Success celebration

## Key Files

```
src/
├── app/
│   ├── layout.tsx      # App layout with POP styling
│   ├── page.tsx        # Main page with wizard
│   └── globals.css     # POP design system
├── config/
│   └── pet-wizard.config.ts  # Complete wizard configuration
├── components/
│   ├── PetTypeSelector.tsx   # Custom field component
│   └── SuccessConfetti.tsx   # Celebration animation
└── lib/
    └── pet-breeds.ts   # Pet breed data
```

## Conditional Logic Examples

### Field-level conditions

```typescript
// Show "sterilized" field only for dogs, cats, and rabbits
{
  name: 'isNeutered',
  type: 'boolean',
  showIf: orConditions(
    createCondition('petType', 'equals', 'dog'),
    createCondition('petType', 'equals', 'cat'),
    createCondition('petType', 'equals', 'rabbit')
  ),
}
```

### Step-level conditions

```typescript
// Show health step only if birth date is provided
{
  id: 'health',
  title: 'Health Info',
  showIf: createCondition('birthDate', 'isNotEmpty', true),
}
```

### Nested conditions

```typescript
// Show microchip number only if hasMicrochip is true
{
  name: 'microchipNumber',
  type: 'text',
  showIf: createCondition('hasMicrochip', 'equals', true),
}
```

## License

MIT - Part of the [better-form](https://github.com/GrandeVx/better-form) project.
