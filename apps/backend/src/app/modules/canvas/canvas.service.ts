import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCanvasDto } from './dto/create-canvas.dto';
import { UpdateCanvasDto } from './dto/update-canvas.dto';
import { Canvas } from '@roadmap/canvas/types';
import { Node, ReactFlowJsonObject, Edge } from '@xyflow/react';

@Injectable()
export class CanvasService {
  constructor(private prisma: PrismaService) {}

  private mapToCanvas(prismaCanvas: any): Canvas {
    return {
      id: prismaCanvas.id,
      userId: prismaCanvas.userId,
      object: prismaCanvas.object as ReactFlowJsonObject<Node, Edge>,
      createdAt: prismaCanvas.createdAt.toISOString(),
      updatedAt: prismaCanvas.updatedAt.toISOString(),
    };
  }

  async create(createCanvasDto: CreateCanvasDto): Promise<Canvas> {
    const canvas = await this.prisma.canvas.create({
      data: {
        userId: createCanvasDto.userId,
        object: JSON.parse(JSON.stringify(createCanvasDto.object)),
      },
    });

    return this.mapToCanvas(canvas);
  }

  async findAll(): Promise<Canvas[]> {
    const canvases = await this.prisma.canvas.findMany();

    return canvases
      .filter((canvas) => canvas.object !== null)
      .map((canvas) => this.mapToCanvas(canvas));
  }

  async findOne(id: string): Promise<Canvas | null> {
    const canvas = await this.prisma.canvas.findUnique({ where: { id } });

    if (!canvas || canvas.object === null) return null;

    return this.mapToCanvas(canvas);
  }

  async update(id: string, updateCanvasDto: UpdateCanvasDto): Promise<Canvas> {
    const cleanedDto = {
      ...updateCanvasDto,
      object: updateCanvasDto.object
        ? JSON.parse(JSON.stringify(updateCanvasDto.object))
        : undefined,
    };

    const data = Object.fromEntries(
      Object.entries(cleanedDto).filter(([_, v]) => v !== undefined)
    );

    const canvas = await this.prisma.canvas.update({
      where: { id },
      data,
    });

    return this.mapToCanvas(canvas);
  }

  async remove(id: string): Promise<Canvas> {
    const canvas = await this.prisma.canvas.delete({
      where: { id },
    });

    return this.mapToCanvas(canvas);
  }
}
