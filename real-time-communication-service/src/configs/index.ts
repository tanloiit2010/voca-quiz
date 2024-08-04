import { NODE_ENV } from 'src/constants';
import type { Config } from './config.interface';

export * from './config.interface';

export default (): Config => ({
  app: {
    nodeEnv: (process.env.NODE_ENV as NODE_ENV) || NODE_ENV.PRODUCTION,
    port: +(process.env.APP_PORT || 3000),
  },
  redis: {
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: +(process.env.REDIS_PORT || 6379),
    db: +(process.env.REDIS_DB || 0),
    url: `redis://${process.env.REDIS_USERNAME ? `${process.env.REDIS_USERNAME}${process.env.REDIS_PASSWORD ? `:${process.env.REDIS_PASSWORD}` : ''}@` : ''}${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/${process.env.REDIS_DB}`,
  },
  queue: {
    attempts: Number(process.env.QUEUE_ATTEMPTS),
    deplay: Number(process.env.QUEUE_DELAY),
    backoffType: process.env.QUEUE_BACKOFF_TYPE as string,
  },
});
