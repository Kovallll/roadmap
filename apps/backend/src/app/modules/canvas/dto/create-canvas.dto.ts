import { IsUUID, IsObject, IsString, IsOptional } from 'class-validator';

import type { CanvasData } from '@roadmap/canvas/types';

export class CreateCanvasDto {
  @IsUUID()
  id: string;

  @IsUUID()
  userId: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsObject()
  @IsOptional()
  data?: CanvasData;
}
