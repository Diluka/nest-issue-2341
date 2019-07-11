import { RedisOptions } from 'ioredis';

export default {
  retryStrategy: times => Math.min(times * 50, 2000),
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT) || 6379,
  db: parseInt(process.env.REDIS_DB) || 0,
} as RedisOptions;
