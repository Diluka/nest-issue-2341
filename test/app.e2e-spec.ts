import { Test } from '@nestjs/testing';
import { BootstrapModule } from '../src/bootstrap.module';
import * as supertest from 'supertest';
import { Logger } from '@nestjs/common';

describe('e2e tests', () => {
  let $: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [BootstrapModule],
    }).compile();

    const app = module.createNestApplication();

    await app.init();

    $ = supertest(app.getHttpServer());
  });

  it('should say hello', async () => {
    const res = await $.get('/').expect(200);
    Logger.log(res.body);
  });
});
