import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">Better Form</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
            A powerful, schema-driven wizard form library for React. Build complex multi-step forms
            with validation, conditional logic, and theming.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/demo"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View Demo
            </Link>
            <a
              href="https://github.com/GrandeVx/better-form"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            title="Schema-Driven"
            description="Define your forms as JSON configurations. No more writing boilerplate component code."
            icon="📋"
          />
          <FeatureCard
            title="Conditional Logic"
            description="Show/hide fields and steps based on form values using a powerful expression system."
            icon="🔀"
          />
          <FeatureCard
            title="25+ Field Types"
            description="Text, select, checkbox, date, file upload, and many more field types out of the box."
            icon="🧩"
          />
          <FeatureCard
            title="Validation"
            description="Built-in validators for common patterns plus support for custom validation functions."
            icon="✅"
          />
          <FeatureCard
            title="Theming"
            description="Fully customizable themes with CSS custom properties. Pre-built presets included."
            icon="🎨"
          />
          <FeatureCard
            title="TypeScript"
            description="Written in TypeScript with full type definitions for excellent developer experience."
            icon="📘"
          />
        </div>

        {/* Quick Start */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Quick Start</h2>
          <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto">
            <code>{`npm install better-form

# or
pnpm add better-form`}</code>
          </pre>
          <div className="mt-6">
            <pre className="bg-slate-900 text-slate-300 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`import { WizardContainer, AutoStep } from 'better-form';
import 'better-form/styles';

const config = {
  id: 'my-wizard',
  steps: [
    {
      id: 'step-1',
      title: 'Personal Info',
      fieldGroups: [{
        id: 'name',
        fields: [
          { id: 'firstName', name: 'firstName', label: 'First Name', type: 'text' },
          { id: 'lastName', name: 'lastName', label: 'Last Name', type: 'text' },
        ]
      }]
    }
  ]
};

export function MyForm() {
  return (
    <WizardContainer config={config} onSubmit={async (data) => console.log(data)}>
      <AutoStep />
    </WizardContainer>
  );
}`}</code>
            </pre>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-slate-500 dark:text-slate-400">
          <p>
            Made with care by{' '}
            <a href="https://github.com/GrandeVx" className="text-blue-600 hover:underline">
              GrandeVx
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
}
