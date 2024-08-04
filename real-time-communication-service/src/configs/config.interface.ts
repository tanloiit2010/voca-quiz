import { NODE_ENV } from 'src/constants';

export interface Config {
  app: AppConfig;
  redis: RedisConfig;
  queue: QueueConfig;
}

export interface AppConfig {
  nodeEnv: NODE_ENV;
  port: number;
}

export interface RedisConfig {
  username?: string;
  password?: string;
  host: string;
  port: number;
  db: number;
  url: string;
}

export interface QueueConfig {
  attempts: number;
  deplay: number;
  backoffType: string;
}
