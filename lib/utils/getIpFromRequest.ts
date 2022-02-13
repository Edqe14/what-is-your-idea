/* eslint-disable import/prefer-default-export */
import { NextApiRequest } from 'next';

export function getIpFromRequest(req: NextApiRequest) {
  const forwarded = req.headers['x-forwarded-for'] as string;
  const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;

  return ip;
}