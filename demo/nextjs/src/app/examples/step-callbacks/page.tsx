'use client';

import { GridBackground } from '@/components/GridBackground';
import { LiveExample } from '@/components/LiveExample';
import { stepCallbacksCode, stepCallbacksConfig } from '@/examples/step-callbacks';
import Link from 'next/link';

export default function StepCallbacksPage() {
  return (
    <GridBackground>
      <main className="min-h-screen py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/examples" className="hover:text-foreground">
                  Examples
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground">Step Callbacks</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-4 text-4xl font-bold">Step Callbacks</h1>
            <p className="max-w-3xl text-lg text-muted-foreground">
              Execute async operations when entering or leaving a step. Use{' '}
              <code className="rounded bg-muted px-1">onEnter</code> to load data and{' '}
              <code className="rounded bg-muted px-1">onExit</code> to validate before proceeding.
            </p>
          </div>

          {/* Key Features */}
          <div className="mb-8 rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Key Features</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  1
                </span>
                <div>
                  <span className="font-medium">onEnter Callback</span>
                  <p className="text-sm text-muted-foreground">
                    Load data, pre-fill fields, or setup when entering a step
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  2
                </span>
                <div>
                  <span className="font-medium">onExit Callback</span>
                  <p className="text-sm text-muted-foreground">
                    Validate via API, save progress, or block navigation
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  3
                </span>
                <div>
                  <span className="font-medium">Step Data Storage</span>
                  <p className="text-sm text-muted-foreground">
                    Use <code className="rounded bg-muted px-1">setStepData</code>/
                    <code className="rounded bg-muted px-1">getStepData</code> for temporary data
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  4
                </span>
                <div>
                  <span className="font-medium">Direction Aware</span>
                  <p className="text-sm text-muted-foreground">
                    Know if user is moving forward or backward with{' '}
                    <code className="rounded bg-muted px-1">direction</code>
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Live Example */}
          <LiveExample
            title="User Verification with Step Callbacks"
            description="Watch the console for callback logs. Use code 123456 for demo verification."
            config={stepCallbacksConfig}
            configCode={stepCallbacksCode}
            highlightLines={[6, 7, 8, 9, 10, 11, 12, 13]}
          />

          {/* Code Explanation */}
          <div className="mt-8 rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">How It Works</h2>
            <div className="prose prose-sm prose-invert max-w-none">
              <p className="text-muted-foreground">
                <strong>onEnter</strong> receives:
              </p>
              <ul className="mt-2 space-y-1 text-muted-foreground">
                <li>
                  <code className="rounded bg-muted px-1 text-foreground">formData</code> - Current
                  form values
                </li>
                <li>
                  <code className="rounded bg-muted px-1 text-foreground">setFieldValue</code> -
                  Pre-fill fields
                </li>
                <li>
                  <code className="rounded bg-muted px-1 text-foreground">setStepData</code> - Store
                  step-specific data
                </li>
              </ul>
              <p className="mt-4 text-muted-foreground">
                <strong>onExit</strong> receives the same plus:
              </p>
              <ul className="mt-2 space-y-1 text-muted-foreground">
                <li>
                  <code className="rounded bg-muted px-1 text-foreground">direction</code> -{' '}
                  &quot;forward&quot; or &quot;backward&quot;
                </li>
                <li>
                  <code className="rounded bg-muted px-1 text-foreground">getStepData</code> -
                  Retrieve stored data
                </li>
              </ul>
              <p className="mt-4 text-muted-foreground">
                Return <code className="rounded bg-muted px-1 text-foreground">true</code> to allow
                navigation, <code className="rounded bg-muted px-1 text-foreground">false</code> or
                a string message to block.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Link
              href="/examples/auto-fill"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Auto-fill onChange
            </Link>
            <Link
              href="/examples/address-autocomplete"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              Address Autocomplete
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </GridBackground>
  );
}
