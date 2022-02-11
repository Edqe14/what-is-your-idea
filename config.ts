import { randomEntry } from './lib/utils';

export const Public = {
  engine: 'text-davinci-001',
  configuration: {
    stop: 'AI:',
    temperature: 0.6,
    max_tokens: 75,
    top_p: 1,
    frequency_penalty: 0.75,
    presence_penalty: 0,
  },
  maxSuggestions: 1,
  suggestionQuestions: [
    'Do you have some suggestion about it?',
    'Can you give me some advice related to it?',
    'Do you have some ideas that is similar to it?'
  ]
};

export const Private = {
  prompts: {
    askForSuggestion(input = '') {
      return `Human: ${randomEntry(Public.suggestionQuestions)}\n${Public.configuration.stop} ${input}`.trim();
    },
    ask(input: string) {
      return `Human: What do you think about an idea "${input}"?\n${Public.configuration.stop}`;
    },
    suggestion(input: string, originalResponse: string, existingSuggestions: string[] = []) {
      const existing = existingSuggestions.map((inp) => this.askForSuggestion(inp));

      return `${`${this.ask(input)} ${originalResponse}\n${existing.join('\n')}`.trim()}\n${this.askForSuggestion()}`;
    }
  }
};

const config = { ...Public, ...Private };

export default config;