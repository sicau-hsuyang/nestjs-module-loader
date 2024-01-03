import { Module } from '@nestjs/common';
import { Test1Controller } from './test1.controller';

@Module({
  controllers: [Test1Controller],
})
export class Test1Module {}
