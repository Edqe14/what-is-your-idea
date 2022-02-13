import rateLimit from 'express-rate-limit';
import { NextApiRequest, NextApiResponse } from 'next';
import RedisStore from 'rate-limit-redis';
import client from './database/redis';
import { getIpFromRequest, runMiddleware } from './utils';

const limiter = rateLimit({
  keyGenerator: (req: NextApiRequest) => getIpFromRequest(req) ?? (req.headers.referer as string),
  windowMs: 60_000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: true,
  store: new RedisStore({
    sendCommand: (...args: string[]) => client.sendCommand(args),
  })
});

export default limiter;
export async function rateLimited(req: NextApiRequest, res: NextApiResponse) {
  try {
    const ip = getIpFromRequest(req);
    if (ip === '::1' || ip?.startsWith('::ffff')) return false;

    await runMiddleware(req, res, limiter);

    return false;
  } catch {
    res.status(429).json({
      ok: 0,
      message: 'Rate limit exceeded'
    });

    return true;
  }
}