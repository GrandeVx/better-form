import type { NextApiRequest, NextApiResponse } from 'next';
import { generateIndexContent } from '../../lib/llm-utils';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const content = generateIndexContent();

  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  res.status(200).send(content);
}
