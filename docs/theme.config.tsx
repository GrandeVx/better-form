import { useTheme } from 'next-themes';
import Image from 'next/image';
import type { DocsThemeConfig } from 'nextra-theme-docs';

function Logo() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Image
        src={isDark ? '/logo-light.svg' : '/logo-dark.svg'}
        alt="better-form"
        width={28}
        height={28}
        style={{ width: 28, height: 28 }}
      />
      <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>better-form</span>
    </div>
  );
}

const config: DocsThemeConfig = {
  logo: <Logo />,
  project: {
    link: 'https://github.com/GrandeVx/better-form',
  },
  // Demo link - only shown in production when NEXT_PUBLIC_DEMO_URL is set
  ...(process.env.NEXT_PUBLIC_DEMO_URL
    ? {
        chat: {
          link: process.env.NEXT_PUBLIC_DEMO_URL,
          icon: (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              role="img"
              aria-label="View Demo"
            >
              <title>View Demo</title>
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          ),
        },
      }
    : {}),
  docsRepositoryBase: 'https://github.com/GrandeVx/better-form/tree/main/docs',
  footer: {
    text: `better-form ${new Date().getFullYear()} - MIT License`,
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s - better-form',
    };
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="The most powerful form wizard library for React. Build complex multi-step forms with JSON configuration, conditional logic, validation, and theming."
      />
      <meta name="theme-color" content="#09090B" />

      {/* Favicon */}
      <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon/favicon-32x32.png" type="image/png" sizes="32x32" />
      <link rel="icon" href="/favicon/favicon-16x16.png" type="image/png" sizes="16x16" />
      <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="better-form" />
      <meta property="og:url" content="https://docs.better-form.eu" />
      <meta property="og:title" content="better-form" />
      <meta
        property="og:description"
        content="The most powerful form wizard library for React. Build complex multi-step forms with JSON configuration, conditional logic, validation, and theming."
      />
      <meta property="og:image" content="https://docs.better-form.eu/og.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@vittoIam" />
      <meta name="twitter:creator" content="@vittoIam" />
      <meta name="twitter:title" content="better-form" />
      <meta name="twitter:description" content="The most powerful form wizard library for React." />
      <meta name="twitter:image" content="https://docs.better-form.eu/og.png" />
    </>
  ),
  primaryHue: 210,
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  editLink: {
    text: 'Edit this page on GitHub',
  },
  feedback: {
    content: 'Question? Give us feedback',
    labels: 'feedback',
  },
  navigation: {
    prev: true,
    next: true,
  },
};

export default config;
