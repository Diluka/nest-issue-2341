import { CacheModule, Global, Logger, Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';

const logger = new Logger('VendorModule');

/**
 * 第三方模块
 */
@Global()
@Module({
  imports: [
    ConfigModule.load(path.join(__dirname, 'config/**/!(*.d).{ts,js}')),
    RedisModule.forRootAsync({
      useFactory: config => {
        logger.verbose({
          message: 'RedisModule.forRootAsync',
          options: config.get('redis'),
        });
        return config.get('redis');
      },
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      useFactory: config => {
        logger.verbose({
          message: 'CacheModule.registerAsync',
          options: config.get('server.cache'),
        });
        return config.get('server.cache');
      },
      inject: [ConfigService],
    }),
  ],
})
export class VendorModule {}
