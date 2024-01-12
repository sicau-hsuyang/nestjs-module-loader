import { Controller, ControllerOptions, applyDecorators } from '@nestjs/common';
import { DuplicateRoutePredicate } from './duplicate-route-predicate.decorator';

export function ActController(options: string | string[] | ControllerOptions) {
  return applyDecorators(
    Controller(options as unknown),
    DuplicateRoutePredicate,
  );
}
