import type { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>better-form</span>,
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
      <meta name="description" content="better-form - A powerful React form wizard library" />
      <meta name="og:title" content="better-form" />
      <meta
        name="og:description"
        content="A powerful React form wizard library with validation, conditional logic, and theming"
      />
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
