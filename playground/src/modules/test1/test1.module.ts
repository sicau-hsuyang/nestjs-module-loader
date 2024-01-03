import { Module } from '@nestjs/common';
import { Test1Controller } from './test1.controller';
import { EnhancedModule } from '../../../../dist/module.decorator';

@EnhancedModule({
  controllers: {
    pattern: '*.controller.js',
    ctxDir: __dirname,
  },
})
export class Test1Module {}
