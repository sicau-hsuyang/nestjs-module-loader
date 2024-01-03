import { Controller, Get } from '@nestjs/common';

@Controller('/test1')
export class Test1Controller {
  @Get('/demo1')
  getDemo1() {
    return 'demo1';
  }
}
