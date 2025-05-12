import { PrismaService } from '../../prisma/prisma.service';
import { CreateCanvasDto } from './dto/create-canvas.dto';
import { UpdateCanvasDto } from './dto/update-canvas.dto';

import { Injectable } from '@nestjs/common';
import { Canvas } from '@prisma/client';

@Injectable()
export class CanvasService {
  constructor(private prisma: PrismaService) {}

  async create(createCanvasDto: Omit<CreateCanvasDto, 'id'>): Promise<Canvas> {
    const preparedData = createCanvasDto.data
      ? JSON.parse(JSON.stringify(createCanvasDto.data))
      : null;

    return this.prisma.canvas.create({
      data: {
        ...createCanvasDto,
        data: preparedData,
      },
    });
  }

  async findAll(): Promise<Canvas[]> {
    return this.prisma.canvas.findMany();
  }

  async findOne(id: string): Promise<Canvas | null> {
    return this.prisma.canvas.findUnique({ where: { id } });
  }

  async findByUserId(userId: string): Promise<Canvas[]> {
    return this.prisma.canvas.findMany({ where: { userId } });
  }

  async update(id: string, updateCanvasDto: UpdateCanvasDto): Promise<Canvas> {
    const preparedData = updateCanvasDto.data
      ? JSON.parse(JSON.stringify(updateCanvasDto.data))
      : undefined;

    const data = Object.fromEntries(
      Object.entries({
        ...updateCanvasDto,
        data: preparedData,
      }).filter(([_, v]) => v !== undefined)
    );

    return this.prisma.canvas.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Canvas> {
    return this.prisma.canvas.delete({
      where: { id },
    });
  }
}
