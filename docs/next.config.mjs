import nextra from 'nextra';

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
});

export default withNextra({
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/llms.txt',
        destination: '/api/llms.txt',
      },
      {
        source: '/llms.txt/:path*',
        destination: '/api/llms/:path*',
      },
    ];
  },
});
