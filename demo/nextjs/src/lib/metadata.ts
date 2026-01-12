import type { Metadata } from 'next';

const siteConfig = {
  name: 'better-form',
  description: 'The most powerful form wizard library for React. Build complex multi-step forms with JSON configuration, conditional logic, validation, and theming.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://better-form.dev',
  ogImage: '/og.png',
  twitter: '@vittoIam',
};

export function createMetadata(override: Metadata = {}): Metadata {
  return {
    ...override,
    title: override.title ?? {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: override.description ?? siteConfig.description,
    keywords: override.keywords ?? [
      'react',
      'form',
      'wizard',
      'multi-step',
      'json',
      'typescript',
      'validation',
      'conditional logic',
    ],
    authors: [{ name: 'GrandeVx', url: 'https://github.com/GrandeVx' }],
    creator: 'GrandeVx',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      title: override.title?.toString() ?? siteConfig.name,
      description: override.description?.toString() ?? siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}${siteConfig.ogImage}`,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
      ...override.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: override.title?.toString() ?? siteConfig.name,
      description: override.description?.toString() ?? siteConfig.description,
      images: [`${siteConfig.url}${siteConfig.ogImage}`],
      creator: siteConfig.twitter,
      ...override.twitter,
    },
    icons: {
      icon: [
        { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
      other: [
        { rel: 'mask-icon', url: '/favicon/favicon-32x32.png', color: '#09090B' },
      ],
    },
    manifest: '/favicon/site.webmanifest',
    ...override,
  };
}

export { siteConfig };
