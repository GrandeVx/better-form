'use client';

import { CodeBlock } from '@/components/CodeBlock';
import { GridBackground } from '@/components/GridBackground';
import type { WizardConfig } from 'better-form';
import { AutoStep, WizardContainer } from 'better-form';
import { useCallback, useEffect, useState } from 'react';

// Preset configurations
const presets: Record<string, { name: string; description: string; config: WizardConfig }> = {
  simple: {
    name: 'Simple Contact',
    description: 'Basic contact form with validation',
    config: {
      id: 'simple-contact',
      title: 'Contact Us',
      steps: [
        {
          id: 'contact',
          title: 'Contact Information',
          fieldGroups: [
            {
              id: 'personal',
              fields: [
                {
                  id: 'name',
                  name: 'name',
                  label: 'Full Name',
                  type: 'text',
                  required: true,
                  placeholder: 'John Doe',
                },
                {
                  id: 'email',
                  name: 'email',
                  label: 'Email Address',
                  type: 'email',
                  required: true,
                  placeholder: 'john@example.com',
                },
                {
                  id: 'message',
                  name: 'message',
                  label: 'Message',
                  type: 'textarea',
                  required: true,
                  placeholder: 'How can we help you?',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  multiStep: {
    name: 'Multi-Step Registration',
    description: 'Registration form with multiple steps',
    config: {
      id: 'registration',
      title: 'Create Account',
      steps: [
        {
          id: 'account',
          title: 'Account Details',
          fieldGroups: [
            {
              id: 'credentials',
              fields: [
                {
                  id: 'username',
                  name: 'username',
                  label: 'Username',
                  type: 'text',
                  required: true,
                  minLength: 3,
                  maxLength: 20,
                },
                {
                  id: 'email',
                  name: 'email',
                  label: 'Email',
                  type: 'email',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          id: 'profile',
          title: 'Profile',
          fieldGroups: [
            {
              id: 'info',
              fields: [
                {
                  id: 'firstName',
                  name: 'firstName',
                  label: 'First Name',
                  type: 'text',
                  required: true,
                },
                {
                  id: 'lastName',
                  name: 'lastName',
                  label: 'Last Name',
                  type: 'text',
                  required: true,
                },
                {
                  id: 'bio',
                  name: 'bio',
                  label: 'Bio',
                  type: 'textarea',
                  placeholder: 'Tell us about yourself...',
                },
              ],
            },
          ],
        },
        {
          id: 'preferences',
          title: 'Preferences',
          fieldGroups: [
            {
              id: 'prefs',
              fields: [
                {
                  id: 'newsletter',
                  name: 'newsletter',
                  label: 'Subscribe to newsletter',
                  type: 'boolean',
                  defaultValue: true,
                },
                {
                  id: 'theme',
                  name: 'theme',
                  label: 'Preferred Theme',
                  type: 'select',
                  options: [
                    { value: 'light', label: 'Light' },
                    { value: 'dark', label: 'Dark' },
                    { value: 'system', label: 'System' },
                  ],
                  defaultValue: 'system',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  conditional: {
    name: 'Conditional Logic',
    description: 'Form with conditional field visibility',
    config: {
      id: 'conditional-demo',
      title: 'Conditional Form',
      steps: [
        {
          id: 'main',
          title: 'Your Information',
          fieldGroups: [
            {
              id: 'type',
              fields: [
                {
                  id: 'userType',
                  name: 'userType',
                  label: 'Are you a business or individual?',
                  type: 'radio',
                  required: true,
                  options: [
                    { value: 'individual', label: 'Individual' },
                    { value: 'business', label: 'Business' },
                  ],
                },
                {
                  id: 'companyName',
                  name: 'companyName',
                  label: 'Company Name',
                  type: 'text',
                  required: true,
                  showIf: {
                    field: 'userType',
                    operator: 'equals',
                    value: 'business',
                  },
                },
                {
                  id: 'vatNumber',
                  name: 'vatNumber',
                  label: 'VAT Number',
                  type: 'text',
                  showIf: {
                    field: 'userType',
                    operator: 'equals',
                    value: 'business',
                  },
                },
                {
                  id: 'fullName',
                  name: 'fullName',
                  label: 'Full Name',
                  type: 'text',
                  required: true,
                  showIf: {
                    field: 'userType',
                    operator: 'equals',
                    value: 'individual',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  },
  fieldTypes: {
    name: 'All Field Types',
    description: 'Showcase of all available field types',
    config: {
      id: 'field-types',
      title: 'Field Types Demo',
      steps: [
        {
          id: 'text-fields',
          title: 'Text Fields',
          fieldGroups: [
            {
              id: 'texts',
              fields: [
                {
                  id: 'text',
                  name: 'text',
                  label: 'Text Input',
                  type: 'text',
                  placeholder: 'Enter text...',
                },
                {
                  id: 'email',
                  name: 'email',
                  label: 'Email Input',
                  type: 'email',
                  placeholder: 'email@example.com',
                },
                {
                  id: 'textarea',
                  name: 'textarea',
                  label: 'Textarea',
                  type: 'textarea',
                  placeholder: 'Enter long text...',
                },
                {
                  id: 'number',
                  name: 'number',
                  label: 'Number Input',
                  type: 'number',
                  min: 0,
                  max: 100,
                },
              ],
            },
          ],
        },
        {
          id: 'selection-fields',
          title: 'Selection Fields',
          fieldGroups: [
            {
              id: 'selections',
              fields: [
                {
                  id: 'select',
                  name: 'select',
                  label: 'Select',
                  type: 'select',
                  options: [
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' },
                  ],
                },
                {
                  id: 'radio',
                  name: 'radio',
                  label: 'Radio Group',
                  type: 'radio',
                  options: [
                    { value: 'a', label: 'Choice A' },
                    { value: 'b', label: 'Choice B' },
                    { value: 'c', label: 'Choice C' },
                  ],
                },
                {
                  id: 'checkbox',
                  name: 'checkbox',
                  label: 'Checkbox Group',
                  type: 'checkbox',
                  options: [
                    { value: 'opt1', label: 'Option 1' },
                    { value: 'opt2', label: 'Option 2' },
                    { value: 'opt3', label: 'Option 3' },
                  ],
                },
                {
                  id: 'boolean',
                  name: 'boolean',
                  label: 'Toggle Switch',
                  type: 'boolean',
                },
              ],
            },
          ],
        },
        {
          id: 'other-fields',
          title: 'Other Fields',
          fieldGroups: [
            {
              id: 'others',
              fields: [
                {
                  id: 'date',
                  name: 'date',
                  label: 'Date Picker',
                  type: 'date',
                },
                {
                  id: 'tel',
                  name: 'tel',
                  label: 'Phone Number',
                  type: 'tel',
                  placeholder: '+1 (555) 123-4567',
                },
              ],
            },
          ],
        },
      ],
    },
  },
};

export default function PlaygroundPage() {
  const [selectedPreset, setSelectedPreset] = useState<string>('simple');
  const [jsonInput, setJsonInput] = useState<string>('');
  const [config, setConfig] = useState<WizardConfig | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [showSubmitData, setShowSubmitData] = useState(false);
  const [submitData, setSubmitData] = useState<Record<string, unknown> | null>(null);

  // Initialize with preset
  useEffect(() => {
    const preset = presets[selectedPreset];
    if (preset) {
      const jsonString = JSON.stringify(preset.config, null, 2);
      setJsonInput(jsonString);
      setConfig(preset.config);
      setError(null);
      setFormKey((k) => k + 1);
      setShowSubmitData(false);
      setSubmitData(null);
    }
  }, [selectedPreset]);

  // Parse JSON and update config
  const handleJsonChange = useCallback((value: string) => {
    setJsonInput(value);
    setShowSubmitData(false);
    setSubmitData(null);

    try {
      const parsed = JSON.parse(value) as WizardConfig;

      // Basic validation
      if (!parsed.id || !parsed.steps || !Array.isArray(parsed.steps)) {
        throw new Error('Invalid config: must have id and steps array');
      }

      setConfig(parsed);
      setError(null);
      setFormKey((k) => k + 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setConfig(null);
    }
  }, []);

  const handleSubmit = useCallback(async (data: Record<string, unknown>) => {
    setSubmitData(data);
    setShowSubmitData(true);
  }, []);

  const formatJson = useCallback(() => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
    } catch {
      // Ignore format errors
    }
  }, [jsonInput]);

  return (
    <GridBackground>
      <main className="min-h-screen py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold">Interactive Playground</h1>
            <p className="text-muted-foreground">
              Edit the JSON configuration and see the form update in real-time
            </p>
          </div>

          {/* Preset Selector */}
          <div className="mb-6">
            <span className="mb-2 block text-sm font-medium">Load Preset</span>
            <div className="flex flex-wrap gap-2">
              {Object.entries(presets).map(([key, preset]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedPreset(key)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    selectedPreset === key
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
            {presets[selectedPreset] && (
              <p className="mt-2 text-sm text-muted-foreground">
                {presets[selectedPreset].description}
              </p>
            )}
          </div>

          {/* Main Content */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Editor Panel */}
            <div className="flex flex-col">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Configuration (JSON)</span>
                <button
                  type="button"
                  onClick={formatJson}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Format JSON
                </button>
              </div>
              <div className="relative flex-1">
                <textarea
                  value={jsonInput}
                  onChange={(e) => handleJsonChange(e.target.value)}
                  className="h-[600px] w-full resize-none rounded-lg border border-border bg-code-bg p-4 font-mono text-sm text-code-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  spellCheck={false}
                />
                {error && (
                  <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-red-500/50 bg-red-500/10 p-3">
                    <p className="text-sm text-red-500">{error}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Preview Panel */}
            <div className="flex flex-col">
              <span className="mb-2 text-sm font-medium">Live Preview</span>
              <div className="flex-1 overflow-hidden rounded-lg border border-border bg-card p-6">
                {config ? (
                  <WizardContainer key={formKey} config={config} onSubmit={handleSubmit}>
                    <AutoStep />
                  </WizardContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <p>Fix the JSON errors to see the preview</p>
                  </div>
                )}
              </div>

              {/* Submit Data Display */}
              {showSubmitData && submitData && (
                <div className="mt-4">
                  <span className="mb-2 block text-sm font-medium">Submitted Data</span>
                  <CodeBlock
                    code={JSON.stringify(submitData, null, 2)}
                    language="json"
                    showLineNumbers={false}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Tips */}
          <div className="mt-8 rounded-lg border border-border bg-card/50 p-6">
            <h3 className="mb-3 font-semibold">Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="text-foreground">• Try conditional logic:</span> Add{' '}
                <code className="rounded bg-muted px-1">showIf</code> or{' '}
                <code className="rounded bg-muted px-1">hideIf</code> to fields
              </li>
              <li>
                <span className="text-foreground">• Add validation:</span> Use{' '}
                <code className="rounded bg-muted px-1">required</code>,{' '}
                <code className="rounded bg-muted px-1">minLength</code>,{' '}
                <code className="rounded bg-muted px-1">maxLength</code>,{' '}
                <code className="rounded bg-muted px-1">min</code>,{' '}
                <code className="rounded bg-muted px-1">max</code>
              </li>
              <li>
                <span className="text-foreground">• Field types:</span> text, email, tel, textarea,
                number, select, radio, checkbox, boolean, date, file
              </li>
              <li>
                <span className="text-foreground">• Multiple steps:</span> Add more objects to the{' '}
                <code className="rounded bg-muted px-1">steps</code> array
              </li>
            </ul>
          </div>
        </div>
      </main>
    </GridBackground>
  );
}
