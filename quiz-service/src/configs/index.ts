import { NODE_ENV } from 'src/constants';
import type { Config } from './config.interface';
import { join } from 'path';

export * from './config.interface';

export default (): Config => ({
  app: {
    nodeEnv: (process.env.NODE_ENV as NODE_ENV) || NODE_ENV.PRODUCTION,
    port: +(process.env.APP_PORT || 3000),
  },
  database: {
    type: process.env.DATABASE_TYPE as string,
    database: process.env.DATABASE_NAME as string,
    host: process.env.DATABASE_HOST as string,
    username: process.env.DATABASE_USERNAME as string,
    password: process.env.DATABASE_PASSWORD as string,
    port: +(process.env.DATABASE_PORT || 3000),
    entities: [join(__dirname, '..', 'database', '**', '*.entity.{ts,js}')],
    migrations: [join(__dirname, '..', 'database', 'migrations', '*.{ts,js}')],
    seeds: [join(__dirname, '..', 'database', 'seeds', '*.{ts,js}')],
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
