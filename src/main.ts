import { NestFactory } from '@nestjs/core';
import { BootstrapModule } from './bootstrap.module';
import { ConfigService } from 'nestjs-config';
import { Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { NestExpressApplication } from '@nestjs/platform-express';

const logger = new Logger('main');

async function bootstrap() {
  const app = (await NestFactory.create(BootstrapModule, {
    cors: true,
  })) as NestExpressApplication;

  const config = app.get(ConfigService);

  app.enable('trust proxy');

  const port = config.get('server.express.port');
  const NODE_ENV = config.get('server.NODE_ENV');

  await app.listen(port, () =>
    logger.warn(`server is listening at ${port} [${NODE_ENV}]`),
  );
}

bootstrap();
