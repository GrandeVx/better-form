'use client';

import { CodeBlock } from '@/components/CodeBlock';
import { GridBackground } from '@/components/GridBackground';
import { SpotlightCard } from '@/components/SpotlightCard';
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

const usageCode = `import { WizardProvider, WizardContainer } from 'better-form';

export default function ContactPage() {
  return (
    <WizardProvider config={wizardConfig}>
      <WizardContainer />
    </WizardProvider>
  );
}`;

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
              <Link href="/examples" className="btn btn-primary">
                View Examples
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
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
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'config'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                wizard.config.ts
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('usage')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'usage'
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
                    <span className="text-primary">$</span> npm install better-form
                  </code>
                </pre>
              </div>
              <Link href="/examples" className="btn btn-primary">
                Explore Examples
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
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
