'use client';

import { CodeBlock } from '@/components/CodeBlock';
import { GridBackground } from '@/components/GridBackground';
import { SpotlightCard } from '@/components/SpotlightCard';
import { useTheme } from '@/components/ThemeProvider';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const configCode = `const wizardConfig: WizardConfig = {
  id: 'contact-form',
  title: 'Contact Us',
  steps: [
    {
      id: 'personal',
      title: 'Personal Info',
      fieldGroups: [{
        id: 'info',
        fields: [
          { id: 'name', name: 'name', label: 'Name', type: 'text', required: true },
          { id: 'email', name: 'email', label: 'Email', type: 'email', required: true },
          {
            id: 'company',
            name: 'company',
            label: 'Company',
            type: 'text',
            showIf: { field: 'userType', operator: 'equals', value: 'business' }
          }
        ]
      }]
    }
  ]
};`;

const usageCode = `import { WizardProvider, WizardContainer } from '@better_form/core';

export default function ContactPage() {
  return (
    <WizardProvider config={wizardConfig}>
      <WizardContainer />
    </WizardProvider>
  );
}`;

const pluginCode = `import { WizardProvider, defaultFieldComponents } from '@better_form/core';
import { googlePlacesPlugin } from '@better_form/plugin-google-places';

// Create plugin instance
const googlePlaces = googlePlacesPlugin({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  defaultCountryRestrictions: ['IT'],
});

// Merge with default components
const fieldComponents = {
  ...defaultFieldComponents,
  ...googlePlaces.fieldComponents,
};

export default function App() {
  return (
    <WizardProvider config={config} fieldComponents={fieldComponents}>
      {/* Your form */}
    </WizardProvider>
  );
}`;

const plugins = [
  {
    name: '@better_form/plugin-google-places',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
    title: 'Google Places',
    description: 'Address autocomplete with interactive map picker and editable detail fields.',
    features: ['Autocomplete', 'Map Picker', 'Reverse Geocoding', 'Detail Fields'],
    status: 'available' as const,
  },
  {
    name: '@better_form/plugin-rich-text',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5 4v3h5.5v12h3V7H19V4H5z" />
      </svg>
    ),
    title: 'Rich Text Editor',
    description: 'WYSIWYG editor with formatting, links, and media embedding.',
    features: ['Bold/Italic', 'Lists', 'Links', 'Images'],
    status: 'coming-soon' as const,
  },
  {
    name: '@better_form/plugin-signature',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
      </svg>
    ),
    title: 'Digital Signature',
    description: 'Capture signatures with touch/mouse drawing and export as image.',
    features: ['Touch Support', 'PNG Export', 'Undo/Redo', 'Clear'],
    status: 'coming-soon' as const,
  },
];

const frameworks = [
  {
    name: 'Next.js',
    icon: (
      <svg width="32" height="32" viewBox="0 0 180 180" fill="none">
        <mask
          id="mask0"
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="180"
          height="180"
        >
          <circle cx="90" cy="90" r="90" fill="black" />
        </mask>
        <g mask="url(#mask0)">
          <circle cx="90" cy="90" r="87" fill="black" stroke="currentColor" strokeWidth="6" />
          <path
            d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
            fill="url(#nextGradient1)"
          />
          <rect x="115" y="54" width="12" height="72" fill="url(#nextGradient2)" />
        </g>
        <defs>
          <linearGradient id="nextGradient1" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="currentColor" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="nextGradient2" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
            <stop stopColor="currentColor" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
    description: 'App Router & Pages Router',
    href: '/getting-started/nextjs',
  },
  {
    name: 'React',
    icon: (
      <svg width="32" height="32" viewBox="-11.5 -10.232 23 20.463">
        <circle r="2.05" fill="currentColor" />
        <g stroke="currentColor" fill="none" strokeWidth="1">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
    description: 'Vite, CRA & custom setups',
    href: '/getting-started/react',
  },
  {
    name: 'Remix',
    icon: (
      <svg width="32" height="32" viewBox="0 0 800 800" fill="none">
        <rect width="800" height="800" rx="100" fill="currentColor" fillOpacity="0.1" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M587.947 527.768C592.201 582.418 592.201 608.036 592.201 636H465.756C465.756 633.035 465.879 630.232 466.003 627.416C466.414 618.041 466.834 608.455 464.717 590.911C461.443 562.298 448.281 554.328 420.004 554.328H331V636H211V289.4C211 262.6 232.6 241 259.4 241H422.947C514.753 241 562.013 286.298 562.013 354.82C562.013 406.103 530.347 437.768 491.34 448.983C525.627 459.653 555.173 488.235 587.947 527.768ZM331 459.328H408.443C444.623 459.328 464.717 441.503 464.717 408.793C464.717 373.835 444.623 358.258 408.443 358.258H331V459.328Z"
          fill="currentColor"
        />
      </svg>
    ),
    description: 'Actions & Loaders',
    href: '/getting-started/remix',
  },
  {
    name: 'Astro',
    icon: (
      <svg width="32" height="32" viewBox="0 0 128 128">
        <path
          fill="currentColor"
          d="M81.504 9.465c.973 1.207 1.469 2.836 2.457 6.09l21.656 71.136a90.079 90.079 0 00-25.89-8.765L65.629 30.28a1.833 1.833 0 00-3.52.004L48.18 77.902a90.104 90.104 0 00-26.003 8.778l21.758-71.14c.996-3.25 1.492-4.876 2.464-6.083a8.023 8.023 0 013.243-2.398c1.433-.575 3.136-.575 6.535-.575H71.72c3.402 0 5.105 0 6.543.579a7.988 7.988 0 013.242 2.402h-.001z"
        />
        <path
          fill="currentColor"
          fillOpacity="0.6"
          d="M84.094 90.074c-3.57 3.054-10.696 5.137-18.903 5.137-10.07 0-18.515-3.137-20.754-7.356-.8 2.418-.98 5.184-.98 6.954 0 0-.527 8.675 5.508 14.71a5.671 5.671 0 015.672-5.671c5.37 0 5.367 4.683 5.363 8.488v.336c0 5.773 3.527 10.719 8.543 12.805a11.62 11.62 0 01-1.172-5.098c0-5.508 3.23-7.555 6.988-9.938 2.989-1.894 6.309-4 8.594-8.222a15.513 15.513 0 001.875-7.41 15.55 15.55 0 00-.734-4.735z"
        />
      </svg>
    ),
    description: 'React Islands',
    href: '/getting-started/astro',
    badge: 'Partial',
  },
];

const features = [
  {
    icon: '{}',
    title: 'JSON-Driven',
    description:
      'Define your entire form structure, validation, and conditional logic in a single JSON configuration.',
  },
  {
    icon: '?',
    title: 'Conditional Logic',
    description:
      'Show/hide fields and steps based on user input with powerful showIf/hideIf conditions.',
  },
  {
    icon: '!',
    title: 'Built-in Validation',
    description:
      'Required, email, min/max, regex patterns, and custom validators with clear error messages.',
  },
  {
    icon: '->',
    title: 'Multi-Step Wizard',
    description:
      'Create complex multi-step forms with progress indicators, navigation, and step callbacks.',
  },
  {
    icon: 'TS',
    title: 'TypeScript First',
    description: 'Full TypeScript support with strict typing for configs, fields, and components.',
  },
  {
    icon: '+',
    title: 'Extensible',
    description:
      'Register custom field components, add plugins, and extend functionality as needed.',
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'config' | 'usage'>('config');
  const { theme } = useTheme();

  return (
    <GridBackground>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8">
          <div className="text-center">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">v1.0 Now Available</span>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-gradient">better-form</span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Build powerful multi-step wizard forms with conditional logic, validation, and
              beautiful UI — all from JSON configuration.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={process.env.NEXT_PUBLIC_DOCS_URL || 'http://localhost:3001'}
                className="btn btn-primary"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                Documentation
              </a>
              <Link href="/examples" className="btn btn-secondary">
                View Examples
              </Link>
              <a
                href="https://github.com/GrandeVx/better-form"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                GitHub
              </a>
            </div>
          </div>

          {/* Code Preview */}
          <div className="mx-auto mt-16 max-w-4xl">
            {/* Tab buttons */}
            <div className="mb-4 flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('config')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'config'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
              >
                wizard.config.ts
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('usage')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'usage'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
              >
                page.tsx
              </button>
            </div>
            {/* Code block */}
            <CodeBlock
              code={activeTab === 'config' ? configCode : usageCode}
              language="typescript"
              highlightLines={activeTab === 'config' ? [13, 14, 15] : [5]}
              showLineNumbers
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Everything you need for wizard forms
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              A complete solution for building complex multi-step forms with minimal code.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <SpotlightCard key={feature.title}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 font-mono text-lg text-primary">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Framework Support Section */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Works with your favorite framework</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              better-form integrates seamlessly with React-based frameworks. Choose your stack and get started in minutes.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {frameworks.map((framework) => (
              <a
                key={framework.name}
                href={`${process.env.NEXT_PUBLIC_DOCS_URL || 'http://localhost:3001'}${framework.href}`}
                className="group relative flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                {framework.badge && (
                  <div className="absolute right-3 top-3 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {framework.badge}
                  </div>
                )}
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                  {framework.icon}
                </div>
                <h3 className="mb-1 text-lg font-semibold">{framework.name}</h3>
                <p className="text-sm text-muted-foreground">{framework.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Plugins Section */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5">
              <span className="text-sm font-medium text-primary">Extensible</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Powerful Plugin System</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Extend better-form with official plugins for specialized field types. Each plugin
              integrates seamlessly with your existing configuration.
            </p>
          </div>

          {/* Plugin Cards */}
          <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plugins.map((plugin) => (
              <div
                key={plugin.name}
                className={`relative rounded-xl border bg-card p-6 transition-all ${plugin.status === 'available'
                    ? 'border-primary/30 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5'
                    : 'border-border opacity-75'
                  }`}
              >
                {plugin.status === 'coming-soon' && (
                  <div className="absolute right-4 top-4 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    Coming Soon
                  </div>
                )}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {plugin.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{plugin.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{plugin.description}</p>
                <div className="flex flex-wrap gap-2">
                  {plugin.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                {plugin.status === 'available' && (
                  <div className="mt-4 border-t border-border pt-4">
                    <code className="text-xs text-muted-foreground">{plugin.name}</code>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Plugin Usage Code */}
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Plugin Integration</h3>
              <Link
                href="/examples/address-autocomplete"
                className="text-sm text-primary hover:underline"
              >
                View Live Demo
              </Link>
            </div>
            <CodeBlock code={pluginCode} language="typescript" showLineNumbers />
          </div>
        </section>

        {/* Quick Start Section */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Get started in seconds</h2>
              <p className="mb-8 text-muted-foreground">
                Install better-form and start building wizard forms immediately.
              </p>
              <div className="mb-8 overflow-hidden rounded-lg bg-code-bg">
                <div className="flex items-center gap-2 border-b border-white/10 bg-black/40 px-4 py-2">
                  <span className="text-sm text-muted-foreground">Terminal</span>
                </div>
                <pre className="p-4 text-left">
                  <code className="text-sm text-code-text">
                    <span className="text-primary">$</span> npm install @better_form/core
                  </code>
                </pre>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`${process.env.NEXT_PUBLIC_DOCS_URL || 'http://localhost:3001'}/getting-started/installation`}
                  className="btn btn-primary"
                >
                  Read the Docs
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
                <Link href="/examples" className="btn btn-secondary">
                  Explore Examples
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Brand */}
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2">
                  <Image
                    src={theme === 'dark' ? '/logo-light.svg' : '/logo-dark.svg'}
                    alt="better-form"
                    width={32}
                    height={32}
                  />
                  <span className="text-lg font-semibold">better-form</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  JSON-driven wizard forms for React with validation, conditional logic, and
                  theming.
                </p>
              </div>

              {/* Documentation */}
              <div>
                <h4 className="mb-3 text-sm font-semibold">Documentation</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a
                      href={`${process.env.NEXT_PUBLIC_DOCS_URL || 'http://localhost:3001'}/getting-started/installation`}
                      className="hover:text-foreground"
                    >
                      Getting Started
                    </a>
                  </li>
                  <li>
                    <a
                      href={`${process.env.NEXT_PUBLIC_DOCS_URL || 'http://localhost:3001'}/core-concepts/wizard-config`}
                      className="hover:text-foreground"
                    >
                      Core Concepts
                    </a>
                  </li>
                  <li>
                    <a
                      href={`${process.env.NEXT_PUBLIC_DOCS_URL || 'http://localhost:3001'}/plugins/google-places`}
                      className="hover:text-foreground"
                    >
                      Plugins
                    </a>
                  </li>
                  <li>
                    <a
                      href={`${process.env.NEXT_PUBLIC_DOCS_URL || 'http://localhost:3001'}/api-reference/types`}
                      className="hover:text-foreground"
                    >
                      API Reference
                    </a>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="mb-3 text-sm font-semibold">Resources</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="/examples" className="hover:text-foreground">
                      Examples
                    </Link>
                  </li>
                  <li>
                    <Link href="/playground" className="hover:text-foreground">
                      Playground
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://github.com/GrandeVx/better-form/releases"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground"
                    >
                      Changelog
                    </a>
                  </li>
                </ul>
              </div>

              {/* Community */}
              <div>
                <h4 className="mb-3 text-sm font-semibold">Community</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a
                      href="https://github.com/GrandeVx/better-form"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/GrandeVx/better-form/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground"
                    >
                      Issues
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/GrandeVx/better-form/discussions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground"
                    >
                      Discussions
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom */}
            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
              <p className="text-sm text-muted-foreground">
                Built with care by{' '}
                <a
                  href="https://github.com/GrandeVx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary"
                >
                  GrandeVx
                </a>
              </p>
              <p className="text-sm text-muted-foreground">MIT License</p>
            </div>
          </div>
        </footer>
      </main>
    </GridBackground>
  );
}
