import { Controller, Get } from '@nestjs/common';
import { DuplicateRoutePredicate } from 'src/decorators/duplicate-route-predicate.decorator';

@DuplicateRoutePredicate
@Controller('/demo2')
export class Demo3Controller {
  @Get('/demo1')
  getDemo1() {
    return 'demo1';
  }
}
