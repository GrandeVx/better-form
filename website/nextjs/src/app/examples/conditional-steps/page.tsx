'use client';

import { GridBackground } from '@/components/GridBackground';
import { LiveExample } from '@/components/LiveExample';
import { conditionalStepsCode, conditionalStepsConfig } from '@/examples/conditional-steps';
import Link from 'next/link';

export default function ConditionalStepsPage() {
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
              <li className="text-foreground">Conditional Steps</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-4 text-4xl font-bold">Conditional Steps</h1>
            <p className="max-w-3xl text-lg text-muted-foreground">
              This example demonstrates how to show or hide entire wizard steps based on user
              selections. When the user selects "Business Account", an additional step appears to
              collect company information.
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
                  <span className="font-medium">showIf Condition</span>
                  <p className="text-sm text-muted-foreground">
                    The "Business Information" step uses{' '}
                    <code className="rounded bg-muted px-1">showIf</code> to conditionally appear
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  2
                </span>
                <div>
                  <span className="font-medium">Dynamic Step Count</span>
                  <p className="text-sm text-muted-foreground">
                    Progress indicator updates automatically based on visible steps
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  3
                </span>
                <div>
                  <span className="font-medium">Radio Selection</span>
                  <p className="text-sm text-muted-foreground">
                    Uses radio buttons with descriptions for clear user choice
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  4
                </span>
                <div>
                  <span className="font-medium">Validation Flow</span>
                  <p className="text-sm text-muted-foreground">
                    Required fields are only validated when their step is visible
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Live Example */}
          <LiveExample
            title="User Registration with Conditional Business Step"
            description="Select 'Business Account' to see the additional company information step"
            config={conditionalStepsConfig}
            configCode={conditionalStepsCode}
            highlightLines={[31, 32, 33, 34, 35, 36]}
          />

          {/* Code Explanation */}
          <div className="mt-8 rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">How It Works</h2>
            <div className="prose prose-sm prose-invert max-w-none">
              <p className="text-muted-foreground">
                The <code className="rounded bg-muted px-1 text-foreground">showIf</code> property
                on a step accepts a condition object with three parts:
              </p>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li>
                  <code className="rounded bg-muted px-1 text-foreground">field</code> - The field
                  ID to check
                </li>
                <li>
                  <code className="rounded bg-muted px-1 text-foreground">operator</code> - The
                  comparison operator (equals, notEquals, contains, etc.)
                </li>
                <li>
                  <code className="rounded bg-muted px-1 text-foreground">value</code> - The value
                  to compare against
                </li>
              </ul>
              <p className="mt-4 text-muted-foreground">
                You can also use{' '}
                <code className="rounded bg-muted px-1 text-foreground">hideIf</code> for the
                inverse logic, or combine multiple conditions with{' '}
                <code className="rounded bg-muted px-1 text-foreground">and</code> /{' '}
                <code className="rounded bg-muted px-1 text-foreground">or</code> arrays.
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
          </div>
        </div>
      </main>
    </GridBackground>
  );
}
