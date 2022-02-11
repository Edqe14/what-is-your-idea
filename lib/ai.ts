import { OpenAIApi, Configuration } from 'openai';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const ai = new OpenAIApi(config);

export default ai;