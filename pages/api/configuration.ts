import { Public } from '@/config';
import { rateLimited } from '@/lib';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (await rateLimited(req, res)) return;

  if (req.method === 'GET') {
    return res.status(200).json(Public);
  }
}


