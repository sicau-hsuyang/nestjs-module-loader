import { Module } from '@nestjs/common';
import { Test1Controller } from './test1.controller';
import { EnhancedModule } from 'nestjs-module-loader';

@EnhancedModule({
  controllers: {
    pattern: '*.controller.js',
    ctxDir: __dirname,
  },
})
export class Test1Module {}
