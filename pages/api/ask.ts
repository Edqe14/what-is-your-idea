import type { NextApiRequest, NextApiResponse } from 'next';
import { Models, AI } from '@/lib';
import config from '@/config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { input } = req.body;
    if (!input) {
      return res.status(400).json({
        ok: 0,
        message: 'Missing input'
      });
    }

    const prompt = config.prompts.ask(input);
    const response = await AI.createCompletion(config.engine, {
      prompt,
      ...config.configuration
    });

    const { model, choices } = response.data;
    const responseText = choices?.[0].text?.trim();

    const data = {
      model: model?.replace(/:/gi, '-'),
      input,
      response: responseText
    };

    const history = new Models.History(data);
    await history.save();

    return res.status(200).json({
      ok: 1,
      // eslint-disable-next-line no-underscore-dangle
      id: history._id,
      prompt,
      ...data
    });
  }
}
