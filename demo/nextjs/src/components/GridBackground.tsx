'use client';

import { cn } from '@/lib/utils';

interface GridBackgroundProps {
  children: React.ReactNode;
  className?: string;
  fade?: boolean;
}

export function GridBackground({ children, className, fade = true }: GridBackgroundProps) {
  return (
    <div className={cn('relative min-h-screen', className)}>
      {/* Grid pattern */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 -z-10',
          fade ? 'grid-background-fade' : 'grid-background'
        )}
        aria-hidden="true"
      />
      {/* Radial gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_70%)]"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

export default GridBackground;
