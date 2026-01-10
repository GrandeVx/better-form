'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  highlightLines?: number[];
  className?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
}

export function CodeBlock({
  code,
  language = 'typescript',
  filename,
  highlightLines = [],
  className,
  showLineNumbers = true,
  showCopyButton = true,
}: CodeBlockProps) {
  const [highlightedHtml, setHighlightedHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  useEffect(() => {
    async function highlight() {
      try {
        const { codeToHtml } = await import('shiki');
        const html = await codeToHtml(code, {
          lang: language,
          theme: 'github-dark',
          transformers: [
            {
              line(node, line) {
                if (highlightLines.includes(line)) {
                  this.addClassToHast(node, 'highlighted');
                }
                if (showLineNumbers) {
                  node.children.unshift({
                    type: 'element',
                    tagName: 'span',
                    properties: { className: ['line-number'] },
                    children: [{ type: 'text', value: String(line).padStart(3, ' ') }],
                  });
                }
              },
            },
          ],
        });
        setHighlightedHtml(html);
      } catch (error) {
        console.error('Failed to highlight code:', error);
        // Fallback to plain code
        setHighlightedHtml(`<pre><code>${escapeHtml(code)}</code></pre>`);
      } finally {
        setIsLoading(false);
      }
    }
    highlight();
  }, [code, language, highlightLines, showLineNumbers]);

  return (
    <div className={cn('code-block overflow-hidden rounded-lg relative group', className)}>
      {filename && (
        <div className="flex items-center gap-2 border-b border-white/10 bg-black/40 px-4 py-2">
          <FileIcon />
          <span className="text-sm text-muted-foreground">{filename}</span>
        </div>
      )}

      {/* Copy button */}
      {showCopyButton && (
        <button
          type="button"
          onClick={handleCopy}
          className="absolute top-2 right-2 z-10 flex items-center gap-1.5 rounded-md bg-muted/80 px-2.5 py-1.5 text-xs font-medium text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-foreground group-hover:opacity-100"
          title="Copy code"
        >
          {copied ? (
            <>
              <CheckIcon />
              Copied!
            </>
          ) : (
            <>
              <CopyIcon />
              Copy
            </>
          )}
        </button>
      )}

      <div className="relative">
        {isLoading ? (
          <pre className="p-4 text-sm leading-tight">
            <code className="text-code-text">{code}</code>
          </pre>
        ) : (
          <div
            className="shiki-wrapper text-[13px] leading-[1.4] [&_pre]:p-4 [&_.line-number]:mr-4 [&_.line-number]:inline-block [&_.line-number]:w-6 [&_.line-number]:text-right [&_.line-number]:text-muted-foreground/40 [&_.line-number]:select-none [&_.highlighted]:bg-primary/10 [&_.highlighted]:mx-[-1rem] [&_.highlighted]:px-4"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        )}
      </div>
    </div>
  );
}

function FileIcon() {
  return (
    <svg
      className="h-4 w-4 text-muted-foreground"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 text-green-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default CodeBlock;
