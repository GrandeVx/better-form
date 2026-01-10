'use client';

import { cn } from '@/lib/utils';
import { AutoStep, WizardContainer, createTheme } from 'better-form';
import type { WizardConfig } from 'better-form';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { CodeBlock } from './CodeBlock';

// Custom dark theme that matches the demo design system
const demoTheme = createTheme({
  colors: {
    primary: '#10b981', // Emerald green
    primaryHover: '#059669',
    primaryForeground: '#ffffff',

    secondary: '#27272a',
    secondaryHover: '#3f3f46',
    secondaryForeground: '#fafafa',

    background: '#09090b',
    surface: '#18181b',
    surfaceHover: '#27272a',

    text: '#fafafa',
    textMuted: '#a1a1aa',
    textDisabled: '#71717a',

    border: '#27272a',
    borderFocus: '#10b981',

    inputBackground: '#18181b',
    inputBorder: '#3f3f46',
    inputPlaceholder: '#71717a',

    error: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
  },
});

interface LiveExampleProps {
  title: string;
  description: string;
  config: WizardConfig;
  configCode: string;
  highlightLines?: number[];
  className?: string;
}

export function LiveExample({
  title,
  description,
  config,
  configCode,
  highlightLines = [],
  className,
}: LiveExampleProps) {
  const [activeView, setActiveView] = useState<'split' | 'code' | 'preview'>('split');
  const [key, setKey] = useState(0);

  const resetForm = () => setKey((k) => k + 1);

  return (
    <div className={cn('overflow-hidden rounded-xl border border-border bg-card', className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex rounded-lg border border-border bg-muted p-1">
            <ViewButton
              active={activeView === 'split'}
              onClick={() => setActiveView('split')}
              title="Split View"
            >
              <SplitIcon />
            </ViewButton>
            <ViewButton
              active={activeView === 'code'}
              onClick={() => setActiveView('code')}
              title="Code Only"
            >
              <CodeIcon />
            </ViewButton>
            <ViewButton
              active={activeView === 'preview'}
              onClick={() => setActiveView('preview')}
              title="Preview Only"
            >
              <PreviewIcon />
            </ViewButton>
          </div>
          {/* Reset button */}
          <button
            type="button"
            onClick={resetForm}
            className="rounded-lg border border-border bg-muted p-2 transition-colors hover:bg-border"
            title="Reset Form"
          >
            <ResetIcon />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          {activeView === 'split' && (
            <motion.div
              key="split"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid h-full md:grid-cols-2"
            >
              {/* Code side */}
              <div className="border-b border-border md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2">
                  <span className="text-xs font-medium text-muted-foreground">CONFIG</span>
                </div>
                <div className="max-h-[450px] overflow-auto">
                  <CodeBlock
                    code={configCode}
                    language="typescript"
                    highlightLines={highlightLines}
                    showLineNumbers
                    className="rounded-none border-0"
                  />
                </div>
              </div>
              {/* Preview side */}
              <div>
                <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2">
                  <span className="text-xs font-medium text-muted-foreground">PREVIEW</span>
                </div>
                <div className="max-h-[450px] overflow-auto p-6">
                  <WizardContainer key={key} config={config} theme={demoTheme}>
                    <AutoStep />
                  </WizardContainer>
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'code' && (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="max-h-[500px] overflow-auto">
                <CodeBlock
                  code={configCode}
                  language="typescript"
                  highlightLines={highlightLines}
                  showLineNumbers
                  className="rounded-none border-0"
                />
              </div>
            </motion.div>
          )}

          {activeView === 'preview' && (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6"
            >
              <WizardContainer key={key} config={config} theme={demoTheme}>
                <AutoStep />
              </WizardContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface ViewButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title: string;
}

function ViewButton({ active, onClick, children, title }: ViewButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={cn(
        'rounded-md p-1.5 transition-colors',
        active
          ? 'bg-background text-foreground shadow-sm'
          : 'text-muted-foreground hover:text-foreground'
      )}
    >
      {children}
    </button>
  );
}

function SplitIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
      />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  );
}

function PreviewIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}

export default LiveExample;
