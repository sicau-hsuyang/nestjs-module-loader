import { Controller, Get } from '@nestjs/common';
import { ActController } from 'src/decorators/act-controller';
import { DuplicateRoutePredicate } from 'src/decorators/duplicate-route-predicate.decorator';

// @DuplicateRoutePredicate
// @Controller('/demo2')
@ActController('/demo22')
export class Demo2Controller {
  @Get('/demo1')
  getDemo1() {
    return 'demo1';
  }
}
