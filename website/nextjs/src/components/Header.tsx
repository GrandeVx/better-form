'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

  // Close menu on route change or escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg',
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={theme === 'dark' ? '/logo-light.svg' : '/logo-dark.svg'}
            alt="better-form"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-lg font-semibold">better-form</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/examples">Examples</NavLink>
          <NavLink href="/playground">Playground</NavLink>
          <NavLink
            href={process.env.NEXT_PUBLIC_DOCS_URL || 'https://docs.better-form.eu'}
            external
          >
            Docs
          </NavLink>
          <NavLink href="https://github.com/GrandeVx/better-form" external>
            GitHub
          </NavLink>
          <ThemeToggle />
        </nav>

        {/* Mobile: Theme toggle + Menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border transition-colors hover:bg-muted"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          {/* Backdrop - keyboard users can close with Escape key */}
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: Backdrop is aria-hidden, keyboard users use Escape */}
          <div
            className="fixed inset-0 top-16 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <nav
            className="fixed inset-x-0 top-16 z-50 border-b border-border bg-background p-4 shadow-lg md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1">
              <MobileNavLink href="/" onClick={closeMenu}>
                Home
              </MobileNavLink>
              <MobileNavLink href="/examples" onClick={closeMenu}>
                Examples
              </MobileNavLink>
              <MobileNavLink href="/playground" onClick={closeMenu}>
                Playground
              </MobileNavLink>

              <div className="my-2 border-t border-border" />

              <MobileNavLink
                href={process.env.NEXT_PUBLIC_DOCS_URL || 'https://docs.better-form.eu'}
                onClick={closeMenu}
                external
              >
                Documentation
              </MobileNavLink>
              <MobileNavLink
                href="https://github.com/GrandeVx/better-form"
                onClick={closeMenu}
                external
              >
                GitHub
              </MobileNavLink>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

function NavLink({ href, children, external }: NavLinkProps) {
  const className =
    'text-sm font-medium text-muted-foreground transition-colors hover:text-foreground';

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
        <svg
          className="ml-1 inline-block h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
  external?: boolean;
}

function MobileNavLink({ href, children, onClick, external }: MobileNavLinkProps) {
  const className =
    'flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-muted';

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {children}
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
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
      <svg
        className="h-4 w-4 text-muted-foreground"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

export default Header;
