'use client';

import { GridBackground } from '@/components/GridBackground';
import { SpotlightCard } from '@/components/SpotlightCard';
import Link from 'next/link';

const examples = [
  {
    slug: 'conditional-steps',
    title: 'Conditional Steps',
    description:
      'Show or hide entire wizard steps based on user selections using showIf/hideIf conditions.',
    icon: '?',
    tags: ['showIf', 'steps', 'dynamic'],
  },
  {
    slug: 'cross-field-validation',
    title: 'Cross-field Validation',
    description: 'Validate fields against each other with custom validation rules and messages.',
    icon: '!',
    tags: ['validation', 'custom', 'rules'],
  },
  {
    slug: 'auto-fill',
    title: 'Auto-fill onChange',
    description:
      'Automatically populate fields based on other field changes using onChange callbacks.',
    icon: '->',
    tags: ['onChange', 'auto-fill', 'callbacks'],
  },
  {
    slug: 'step-callbacks',
    title: 'Step Callbacks',
    description: 'Execute custom logic when entering or exiting steps with onEnter/onExit hooks.',
    icon: 'fn',
    tags: ['onEnter', 'onExit', 'lifecycle'],
  },
  {
    slug: 'address-autocomplete',
    title: 'Address Autocomplete',
    description: 'Integrate with address APIs to auto-complete and validate addresses.',
    icon: '@',
    tags: ['address', 'api', 'autocomplete'],
  },
];

export default function ExamplesPage() {
  return (
    <GridBackground>
      <main className="min-h-screen py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Examples</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Explore real-world examples showcasing the power and flexibility of better-form. Each
              example includes full source code and interactive previews.
            </p>
          </div>

          {/* Examples Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {examples.map((example) => (
              <ExampleCard key={example.slug} example={example} />
            ))}
          </div>

          {/* Back link */}
          <div className="mt-12 text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </main>
    </GridBackground>
  );
}

interface ExampleCardProps {
  example: {
    slug: string;
    title: string;
    description: string;
    icon: string;
    tags: string[];
    comingSoon?: boolean;
  };
}

function ExampleCard({ example }: ExampleCardProps) {
  const content = (
    <SpotlightCard className="h-full">
      <div className="flex h-full flex-col">
        {/* Icon */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 font-mono text-lg text-primary">
          {example.icon}
        </div>

        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold">
          {example.title}
          {example.comingSoon && (
            <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs font-normal text-muted-foreground">
              Coming Soon
            </span>
          )}
        </h3>

        {/* Description */}
        <p className="mb-4 flex-1 text-sm text-muted-foreground">{example.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {example.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow indicator */}
        {!example.comingSoon && (
          <div className="mt-4 flex items-center text-sm text-primary">
            View Example
            <svg
              className="ml-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </SpotlightCard>
  );

  if (example.comingSoon) {
    return <div className="opacity-60">{content}</div>;
  }

  return (
    <Link
      href={`/examples/${example.slug}`}
      className="block transition-transform hover:scale-[1.02]"
    >
      {content}
    </Link>
  );
}
