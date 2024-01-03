import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnhancedModule } from '../../dist/module.decorator';

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
})
export class AppModule {}
