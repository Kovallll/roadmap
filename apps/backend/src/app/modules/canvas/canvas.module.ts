import { PrismaService } from '../../prisma/prisma.service';
import { CanvasController } from './canvas.controller';
import { CanvasService } from './canvas.service';

import { Module } from '@nestjs/common';

@Module({
  controllers: [CanvasController],
  providers: [CanvasService, PrismaService],
})
export class CanvasModule {}
