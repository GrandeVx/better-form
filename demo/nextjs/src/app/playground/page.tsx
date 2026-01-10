'use client';

import { GridBackground } from '@/components/GridBackground';
import Link from 'next/link';

export default function PlaygroundPage() {
  return (
    <GridBackground>
      <main className="flex min-h-screen items-center justify-center py-16">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6 lg:px-8">
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <svg
              className="h-8 w-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-3xl font-bold">Interactive Playground</h1>

          {/* Description */}
          <p className="mb-8 text-lg text-muted-foreground">
            A live JSON editor where you can experiment with wizard configurations in real-time.
            Coming soon!
          </p>

          {/* Status badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-500" />
            <span className="text-sm text-muted-foreground">Under Development</span>
          </div>

          {/* Back link */}
          <div>
            <Link href="/examples" className="text-sm text-muted-foreground hover:text-foreground">
              &larr; View Examples Instead
            </Link>
          </div>
        </div>
      </main>
    </GridBackground>
  );
}
