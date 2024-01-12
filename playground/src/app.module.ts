import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnhancedModule } from 'nestjs-module-loader';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
@EnhancedModule({
  imports: [
    {
      pattern: 'modules/**/*.module.js',
      ctxDir: __dirname,
    },
  ],
  controllers: [
    {
      pattern: 'controllers/*.controller.js',
      ctxDir: __dirname,
    },
    AppController,
  ],
  providers: [AppService],
})
export class AppModule {}
