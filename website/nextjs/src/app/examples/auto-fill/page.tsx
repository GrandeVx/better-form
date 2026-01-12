'use client';

import { GridBackground } from '@/components/GridBackground';
import { LiveExample } from '@/components/LiveExample';
import { autoFillCode, autoFillConfig } from '@/examples/auto-fill';
import Link from 'next/link';

export default function AutoFillPage() {
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
              <li className="text-foreground">Auto-fill onChange</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-4 text-4xl font-bold">Auto-fill onChange</h1>
            <p className="max-w-3xl text-lg text-muted-foreground">
              Automatically populate related fields when a selection changes. This example shows
              province-to-region mapping, dynamic subcategories, and auto-calculated VAT.
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
                  <span className="font-medium">setFieldValue</span>
                  <p className="text-sm text-muted-foreground">
                    Update any field&apos;s value from{' '}
                    <code className="rounded bg-muted px-1">onChange</code>
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  2
                </span>
                <div>
                  <span className="font-medium">setFieldOptions</span>
                  <p className="text-sm text-muted-foreground">
                    Dynamically update select options based on selections
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  3
                </span>
                <div>
                  <span className="font-medium">Cascading Selects</span>
                  <p className="text-sm text-muted-foreground">
                    Category → Subcategory with filtered options
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  4
                </span>
                <div>
                  <span className="font-medium">Auto Calculations</span>
                  <p className="text-sm text-muted-foreground">
                    Price → VAT → Total auto-computed on input
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Live Example */}
          <LiveExample
            title="Product Registration with Auto-fill"
            description="Select a province to auto-fill region, or enter a price to see VAT calculated"
            config={autoFillConfig}
            configCode={autoFillCode}
            highlightLines={[14, 15, 16, 17]}
          />

          {/* Code Explanation */}
          <div className="mt-8 rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">How It Works</h2>
            <div className="prose prose-sm prose-invert max-w-none">
              <p className="text-muted-foreground">
                The <code className="rounded bg-muted px-1 text-foreground">onChange</code> handler
                receives:
              </p>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li>
                  <code className="rounded bg-muted px-1 text-foreground">value</code> - The new
                  value of the field
                </li>
                <li>
                  <code className="rounded bg-muted px-1 text-foreground">
                    setFieldValue(name, value)
                  </code>{' '}
                  - Set another field&apos;s value
                </li>
                <li>
                  <code className="rounded bg-muted px-1 text-foreground">
                    setFieldOptions(name, options)
                  </code>{' '}
                  - Update a select&apos;s options
                </li>
              </ul>
              <p className="mt-4 text-muted-foreground">
                This enables cascading selects, auto-calculations, and dependent field updates.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Link
              href="/examples/cross-field-validation"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Cross-field Validation
            </Link>
            <Link
              href="/examples/step-callbacks"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              Step Callbacks
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
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
