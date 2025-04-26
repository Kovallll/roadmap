import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CanvasService } from './canvas.service';
import { CreateCanvasDto } from './dto/create-canvas.dto';
import { UpdateCanvasDto } from './dto/update-canvas.dto';
import { JwtAuthGuard } from '@back/app/auth/jwt-auth.guard';

@Controller('canvas')
export class CanvasController {
  constructor(private readonly canvasService: CanvasService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCanvasDto: CreateCanvasDto) {
    return this.canvasService.create(createCanvasDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.canvasService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.canvasService.findByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.canvasService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateCanvasDto) {
    return this.canvasService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.canvasService.remove(id);
  }
}
