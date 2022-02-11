import type { NextApiRequest, NextApiResponse } from 'next';
import { Models, AI } from '@/lib';
import config from '@/config';
import { IHistory } from '@/lib/model/history';
import { transformId } from '@/lib/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') return;

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({
      ok: 0,
      message: 'Missing ID'
    });
  }

  if (!(await Models.History.exists({ _id: id }).catch(() => false))) {
    return res.status(404).json({
      ok: 0,
      message: 'Unknown ID given'
    });
  }

  const entry = await Models.History.findById(id, )
    .transform((history) => {
      if (!history) return history;

      return transformId(history, { versionKey: false });
    });

  const suggestions = await Models.Suggestion
    .find({ parentId: id })
    // eslint-disable-next-line no-underscore-dangle
    .transform((entries) => entries.map((v) => v._id));

  return res.status(200).json({
    ok: 1,
    entry,
    suggestions
  });
}
