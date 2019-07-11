import { Injectable } from '@nestjs/common';

@Injectable()
export class IndexService {
  hello() {
    return 'hello world!';
  }
}
