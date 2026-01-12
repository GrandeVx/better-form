import fs from 'node:fs';
import path from 'node:path';

interface PageInfo {
  title: string;
  description: string;
  url: string;
  slug: string[];
  category: string;
}

interface FrontMatter {
  title?: string;
  description?: string;
}

const PAGES_DIR = path.join(process.cwd(), 'pages');

/**
 * Parse frontmatter from MDX content
 */
function parseFrontMatter(content: string): { frontMatter: FrontMatter; body: string } {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n/;
  const match = content.match(frontMatterRegex);

  if (!match) {
    return { frontMatter: {}, body: content };
  }

  const frontMatterStr = match[1];
  const body = content.slice(match[0].length);

  const frontMatter: FrontMatter = {};
  const lines = frontMatterStr.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      // Remove quotes if present
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (key === 'title' || key === 'description') {
        frontMatter[key] = value;
      }
    }
  }

  return { frontMatter, body };
}

/**
 * Extract title from MDX content (first h1 or frontmatter)
 */
function extractTitle(content: string, frontMatter: FrontMatter): string {
  if (frontMatter.title) {
    return frontMatter.title;
  }

  // Look for first h1
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return h1Match[1];
  }

  return 'Untitled';
}

/**
 * Convert MDX to plain markdown
 * - Removes JSX imports
 * - Converts JSX components to markdown equivalents where possible
 * - Preserves code blocks and regular markdown
 */
function mdxToMarkdown(content: string): string {
  let markdown = content;

  // Remove import statements
  markdown = markdown.replace(/^import\s+.*$/gm, '');

  // Remove export statements (but keep their content if it's a component)
  markdown = markdown.replace(/^export\s+default\s+.*$/gm, '');
  markdown = markdown.replace(/^export\s+(?:const|let|var|function)\s+.*$/gm, '');

  // Convert Nextra components to markdown
  // <Callout type="info">content</Callout> -> > **Info:** content
  markdown = markdown.replace(
    /<Callout\s+type="(\w+)"[^>]*>([\s\S]*?)<\/Callout>/g,
    (_, type, content) => {
      const label = type.charAt(0).toUpperCase() + type.slice(1);
      return `> **${label}:** ${content.trim()}`;
    }
  );

  // <Callout>content</Callout> -> > content
  markdown = markdown.replace(
    /<Callout[^>]*>([\s\S]*?)<\/Callout>/g,
    (_, content) => `> ${content.trim()}`
  );

  // <Tab> components - just extract content
  markdown = markdown.replace(/<Tabs[^>]*>([\s\S]*?)<\/Tabs>/g, '$1');
  markdown = markdown.replace(/<Tab[^>]*>([\s\S]*?)<\/Tab>/g, '$1');

  // <Cards> and <Card> - convert to list
  markdown = markdown.replace(/<Cards[^>]*>([\s\S]*?)<\/Cards>/g, '$1');
  markdown = markdown.replace(/<Card\s+title="([^"]+)"[^>]*href="([^"]+)"[^>]*\/?>/g, '- [$1]($2)');
  markdown = markdown.replace(/<Card[^>]*>([\s\S]*?)<\/Card>/g, '- $1');

  // <Steps> - just extract content
  markdown = markdown.replace(/<Steps[^>]*>([\s\S]*?)<\/Steps>/g, '$1');

  // Remove remaining self-closing JSX tags
  markdown = markdown.replace(/<\w+[^>]*\/>/g, '');

  // Remove remaining JSX tags but keep content
  markdown = markdown.replace(/<(\w+)[^>]*>([\s\S]*?)<\/\1>/g, '$2');

  // Clean up extra blank lines
  markdown = markdown.replace(/\n{3,}/g, '\n\n');

  // Trim
  markdown = markdown.trim();

  return markdown;
}

/**
 * Get all MDX pages from the pages directory
 */
export function getAllPages(): PageInfo[] {
  const pages: PageInfo[] = [];

  function scanDirectory(dir: string, slugPrefix: string[] = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // Skip special directories
        if (entry.name.startsWith('_') || entry.name.startsWith('.') || entry.name === 'api') {
          continue;
        }
        scanDirectory(fullPath, [...slugPrefix, entry.name]);
      } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
        // Skip _meta.json and special files
        if (entry.name.startsWith('_')) {
          continue;
        }

        const fileName = entry.name.replace(/\.mdx?$/, '');
        const slug = fileName === 'index' ? slugPrefix : [...slugPrefix, fileName];

        // Skip root index for now (it's the homepage)
        if (slug.length === 0) {
          continue;
        }

        const content = fs.readFileSync(fullPath, 'utf-8');
        const { frontMatter, body } = parseFrontMatter(content);
        const title = extractTitle(body, frontMatter);

        pages.push({
          title,
          description: frontMatter.description || '',
          url: `/llms.txt/${slug.join('/')}.md`,
          slug,
          category: slug[0] || 'general',
        });
      }
    }
  }

  scanDirectory(PAGES_DIR);
  return pages;
}

/**
 * Get a single page's content as markdown
 */
export function getPageContent(
  slug: string[]
): { title: string; description: string; content: string } | null {
  // Try different file paths
  const possiblePaths = [
    `${path.join(PAGES_DIR, ...slug)}.mdx`,
    `${path.join(PAGES_DIR, ...slug)}.md`,
    path.join(PAGES_DIR, ...slug, 'index.mdx'),
    path.join(PAGES_DIR, ...slug, 'index.md'),
  ];

  let filePath: string | null = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      filePath = p;
      break;
    }
  }

  if (!filePath) {
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const { frontMatter, body } = parseFrontMatter(content);
  const title = extractTitle(body, frontMatter);
  const markdown = mdxToMarkdown(body);

  return {
    title,
    description: frontMatter.description || '',
    content: markdown,
  };
}

/**
 * Generate the index page content
 */
export function generateIndexContent(): string {
  const pages = getAllPages();

  // Group by category
  const grouped = new Map<string, PageInfo[]>();
  for (const page of pages) {
    if (!grouped.has(page.category)) {
      grouped.set(page.category, []);
    }
    grouped.get(page.category)?.push(page);
  }

  // Format category name
  const formatCategory = (cat: string) =>
    cat
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  let content = `# better-form

> A powerful React form wizard library with validation, conditional logic, and theming.

## Table of Contents

`;

  const sortedCategories = Array.from(grouped.keys()).sort();

  for (const category of sortedCategories) {
    const categoryPages = grouped.get(category);
    if (!categoryPages) continue;

    content += `### ${formatCategory(category)}\n\n`;

    for (const page of categoryPages) {
      const desc = page.description ? `: ${page.description}` : '';
      content += `- [${page.title}](${page.url})${desc}\n`;
    }

    content += '\n';
  }

  content += `---

## AI Tooling

This documentation is available in markdown format for AI assistants:
- \`/llms.txt\` - This index page
- \`/llms.txt/{category}/{page}.md\` - Individual documentation pages

Example: \`/llms.txt/getting-started/installation.md\`
`;

  return content;
}

/**
 * Error message for AI assistants
 */
export const LLM_TEXT_ERROR = `# Documentation Not Available

The requested better-form documentation page could not be loaded.

**For AI Assistants:**
1. Check /llms.txt for available documentation paths
2. Inform the user this specific page couldn't be loaded
3. Offer to help with related better-form topics from available documentation
`;
