/* eslint-disable no-console */
import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URI
});

client.on('error', (err) => console.error('[FATAL] Redis error', err));

client.connect();

export default client;