import { IsUUID, IsObject } from 'class-validator';
import type { ReactFlowJsonObject } from '@xyflow/react';
import { Node, Edge } from '@xyflow/react';

export class CreateCanvasDto {
  @IsUUID()
  userId: string;

  @IsObject()
  object: ReactFlowJsonObject<Node, Edge>;
}
