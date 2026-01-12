'use client';

import { GridBackground } from '@/components/GridBackground';
import { LiveExample } from '@/components/LiveExample';
import {
  crossFieldValidationCode,
  crossFieldValidationConfig,
} from '@/examples/cross-field-validation';
import Link from 'next/link';

export default function CrossFieldValidationPage() {
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
              <li className="text-foreground">Cross-field Validation</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-4 text-4xl font-bold">Cross-field Validation</h1>
            <p className="max-w-3xl text-lg text-muted-foreground">
              Validate fields against each other using custom validators. This example shows date
              range validation, attendee limits, and price comparisons where one field depends on
              another.
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
                  <span className="font-medium">Custom Validator</span>
                  <p className="text-sm text-muted-foreground">
                    Access <code className="rounded bg-muted px-1">formData</code> in validation to
                    compare with other fields
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  2
                </span>
                <div>
                  <span className="font-medium">Date Range</span>
                  <p className="text-sm text-muted-foreground">
                    End date must be after start date validation
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  3
                </span>
                <div>
                  <span className="font-medium">Number Comparison</span>
                  <p className="text-sm text-muted-foreground">
                    Max attendees must be greater than minimum
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  4
                </span>
                <div>
                  <span className="font-medium">Price Validation</span>
                  <p className="text-sm text-muted-foreground">
                    VIP price must be higher than regular price
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Live Example */}
          <LiveExample
            title="Event Booking with Cross-field Validation"
            description="Try entering an end date before the start date to see validation in action"
            config={crossFieldValidationConfig}
            configCode={crossFieldValidationCode}
            highlightLines={[17, 18, 19, 20, 21, 22, 23]}
          />

          {/* Code Explanation */}
          <div className="mt-8 rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">How It Works</h2>
            <div className="prose prose-sm prose-invert max-w-none">
              <p className="text-muted-foreground">
                The <code className="rounded bg-muted px-1 text-foreground">customValidator</code>{' '}
                function receives two parameters:
              </p>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li>
                  <code className="rounded bg-muted px-1 text-foreground">value</code> - The current
                  field&apos;s value
                </li>
                <li>
                  <code className="rounded bg-muted px-1 text-foreground">formData</code> - All form
                  data, allowing access to other fields
                </li>
              </ul>
              <p className="mt-4 text-muted-foreground">
                Return <code className="rounded bg-muted px-1 text-foreground">true</code> if valid,
                or <code className="rounded bg-muted px-1 text-foreground">false</code> to trigger
                the error message.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Link
              href="/examples"
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
              Back to Examples
            </Link>
            <Link
              href="/examples/auto-fill"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              Auto-fill onChange
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
