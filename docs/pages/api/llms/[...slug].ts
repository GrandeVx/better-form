import type { NextApiRequest, NextApiResponse } from 'next';
import { LLM_TEXT_ERROR, getPageContent } from '../../../lib/llm-utils';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!slug || !Array.isArray(slug)) {
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.status(400).send('# Bad Request\n\nNo slug provided.');
    return;
  }

  // Remove .md extension if present
  const cleanSlug = [...slug];
  if (cleanSlug.length > 0 && cleanSlug[cleanSlug.length - 1].endsWith('.md')) {
    cleanSlug[cleanSlug.length - 1] = cleanSlug[cleanSlug.length - 1].replace(/\.md$/, '');
  }

  const page = getPageContent(cleanSlug);

  if (!page) {
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.status(404).send(LLM_TEXT_ERROR);
    return;
  }

  const content = `# ${page.title}

${page.description ? `> ${page.description}\n\n` : ''}${page.content}
`;

  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  res.status(200).send(content);
}
