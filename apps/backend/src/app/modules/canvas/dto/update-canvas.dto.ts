import { CreateCanvasDto } from './create-canvas.dto';

import { PartialType } from '@nestjs/mapped-types';

export class UpdateCanvasDto extends PartialType(CreateCanvasDto) {}
