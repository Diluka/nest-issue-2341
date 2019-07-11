import { Global, Module } from '@nestjs/common';
import { IndexController } from './index.controller';
import { IndexService } from './service/index.service';

/**
 * 核心模块
 * 自动加载.nestrc中定义的组件
 */
@Global()
@Module({
  controllers: [IndexController],
  providers: [IndexService],
})
export class CoreModule {}
