import {
  Controller,
  Get,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import { IndexService } from './service/index.service';

@Controller()
export class IndexController {
  constructor(
    private readonly config: ConfigService,
    private service: IndexService,
  ) {}

  @UseInterceptors(CacheInterceptor)
  @Get()
  async index() {
    const name = this.config.get('server.name');
    const message = this.service.hello();
    return `${message} from ${name}`;
  }
}
