import {
  Global,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { CoreModule } from './core.module';
import { VendorModule } from './vendor.module';
import { ConfigService } from 'nestjs-config';
import * as morgan from 'morgan';

/**
 * 启动模块
 * 加载各种三方组件和业务模块
 */
@Global()
@Module({
  imports: [VendorModule, CoreModule],
})
export class BootstrapModule implements NestModule {
  constructor(private config: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    this.applyMorgan(consumer);
  }

  private applyMorgan(consumer: MiddlewareConsumer) {
    morgan.token('body', req => JSON.stringify(req.body));

    consumer
      .apply(
        morgan(`:method::url :status :response-time ms :remote-addr :body`, {
          stream: { write: msg => Logger.debug(msg.trim(), 'morgan') },
          skip: (req, res) =>
            this.config.get('server.NODE_ENV') === 'production' &&
            res.statusCode < 400,
        }),
      )
      .forRoutes('/**');
  }
}
