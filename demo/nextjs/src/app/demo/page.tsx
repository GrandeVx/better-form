'use client';

import { useState } from 'react';
import Link from 'next/link';
import { WizardContainer, AutoStep } from 'better-form';
import { demoWizardConfig } from '@/lib/demo-wizard.config';

export default function DemoPage() {
  const [submittedData, setSubmittedData] = useState<Record<string, unknown> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: Record<string, unknown>) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Form submitted:', data);
    setSubmittedData(data);
    setIsSubmitting(false);
  };

  const handleNotify = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    // Simple notification - could integrate with toast library
    console.log(`[${type.toUpperCase()}] ${message}`);
  };

  if (submittedData) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Registration Complete!
              </h1>
              <p className="text-slate-600 dark:text-slate-300 mt-2">
                Thank you for trying the Better Form demo.
              </p>
            </div>

            <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 mb-6">
              <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Submitted Data:
              </h2>
              <pre className="text-xs text-slate-600 dark:text-slate-400 overflow-auto">
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setSubmittedData(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                Back Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-4"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Interactive Demo
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            Try the better-form wizard with validation, conditional logic, and theming.
          </p>
        </div>

        {/* Wizard */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
          <WizardContainer
            config={demoWizardConfig}
            onSubmit={handleSubmit}
            onNotify={handleNotify}
            onStepChange={(index, stepId) => {
              console.log(`Step changed to: ${stepId} (index: ${index})`);
            }}
          >
            <AutoStep />
          </WizardContainer>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
            Demo Features
          </h3>
          <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
            <li>• Multi-step wizard with progress indicator</li>
            <li>• Field validation (required, email, min values)</li>
            <li>• Conditional field visibility (try selecting &quot;Enterprise&quot;)</li>
            <li>• Conditional step visibility (select &quot;Pro&quot; + 3+ features)</li>
            <li>• Multiple field types (text, select, radio, checkbox, textarea)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
