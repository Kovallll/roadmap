import { Module } from '@nestjs/common';
import { CanvasService } from './canvas.service';
import { CanvasController } from './canvas.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [CanvasController],
  providers: [CanvasService, PrismaService],
})
export class CanvasModule {}
