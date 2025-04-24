import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CanvasModule } from './modules/canvas/canvas.module';

@Module({
  imports: [CanvasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
