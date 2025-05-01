import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseFilters,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CanvasService } from './canvas.service';
import { CreateCanvasDto } from './dto/create-canvas.dto';
import { UpdateCanvasDto } from './dto/update-canvas.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { EmptyArrayFilter } from '@/filters/EmptyArrayFilter';
import { NotFoundFilter } from '@/filters/NotFoundFilter';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('canvas')
@Controller('canvas')
export class CanvasController {
  constructor(private readonly canvasService: CanvasService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Создать новый холст' })
  @ApiResponse({ status: 201, description: 'Холст успешно создан' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  create(@Body() createCanvasDto: Omit<CreateCanvasDto, 'id'>) {
    return this.canvasService.create(createCanvasDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(EmptyArrayFilter)
  @Get()
  @ApiOperation({ summary: 'Получить все холсты' })
  @ApiResponse({ status: 200, description: 'Возвращает список холстов' })
  findAll() {
    return this.canvasService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(EmptyArrayFilter)
  @Get('user/:userId')
  @ApiOperation({ summary: 'Получить холсты пользователя по ID' })
  @ApiResponse({ status: 200, description: 'Возвращает холсты пользователя' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  findByUserId(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.canvasService.findByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(NotFoundFilter)
  @Get(':id')
  @ApiOperation({ summary: 'Получить холст по ID' })
  @ApiResponse({ status: 200, description: 'Возвращает холст по ID' })
  @ApiResponse({ status: 404, description: 'Холст не найден' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.canvasService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(NotFoundFilter)
  @Patch(':id')
  @ApiOperation({ summary: 'Обновить холст по ID' })
  @ApiResponse({ status: 200, description: 'Холст успешно обновлён' })
  @ApiResponse({ status: 404, description: 'Холст не найден' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateCanvasDto
  ) {
    return this.canvasService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(NotFoundFilter)
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить холст по ID' })
  @ApiResponse({ status: 200, description: 'Холст успешно удалён' })
  @ApiResponse({ status: 404, description: 'Холст не найден' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.canvasService.remove(id);
  }
}
