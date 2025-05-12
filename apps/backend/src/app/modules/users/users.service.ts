import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Injectable, NotFoundException } from '@nestjs/common';
import { User,UserWithPassword } from '@roadmap/user/types';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(username: string): Promise<UserWithPassword | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async getUserById(id: string): Promise<UserWithPassword | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async createUser(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    }
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    }
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
