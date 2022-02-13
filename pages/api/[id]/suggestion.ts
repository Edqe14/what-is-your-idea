import type { NextApiRequest, NextApiResponse } from 'next';
import { Models, AI, rateLimited } from '@/lib';
import config from '@/config';
import { IHistory } from '@/lib/database/model/history';
import { transformId } from '@/lib/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (await rateLimited(req, res)) return;

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

  if (req.method === 'GET') {
    const entries = await Models.Suggestion.find({ parentId: id })
      .transform((suggestions) => suggestions.map((v) => transformId(v, { versionKey: false }, ['parentId'])));

    return res.status(200).json({
      ok: 1,
      parentId: id,
      entries
    });
  }

  if (req.method === 'POST') {
    if ((await Models.Suggestion.count({ parentId: id })) >= config.maxSuggestions) {
      return res.status(422).json({
        ok: 0,
        message: 'Too many suggestions requested for a single input'
      });
    }

    const [original, others] = await Promise.all([
      Models.History.findById(id).exec() as Promise<IHistory>,
      Models.Suggestion.find({ parentId: id })
        .transform((suggestions) => suggestions.map((entry) => entry.response))
    ]);

    const prompt = config.prompts.suggestion(original.input, original.response, others);
    const response = await AI.createCompletion(original.model, {
      prompt,
      ...config.configuration
    });

    const { model, choices } = response.data;
    const responseText = choices?.[0].text?.trim();

    const data = {
      parentId: id,
      response: responseText,
      prompt
    };

    const suggestion = new Models.Suggestion(data);
    await suggestion.save();

    return res.status(200).json({
      ok: 1,
      model: model?.replace(/:/gi, '-'),
      // eslint-disable-next-line no-underscore-dangle
      id: suggestion._id,
      ...data
    });
  }
}
