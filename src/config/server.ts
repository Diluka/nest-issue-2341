import { CacheModuleOptions } from '@nestjs/common';
import { RedisOptions } from 'ioredis';
import * as cacheMangerStore from 'cache-manager-ioredis';
import redis from './redis';

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  name: process.env.npm_package_name || 'demo',
  version: process.env.npm_package_version || '0.0.0',
  express: {
    port: parseInt(process.env.EXPRESS_PORT) || 3000,
  },
  cache: {
    ttl: parseInt(process.env.CACHE_TTL) || 10,
    max: parseInt(process.env.CACHE_MAX) || 100,
    store: cacheMangerStore,
    ...redis,
    keyPrefix: process.env.CAHCE_KEY_PREFIX || 'NESTJS_CACHE:',
  } as CacheModuleOptions | RedisOptions,
};
