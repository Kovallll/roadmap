import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserWithPassword, User } from '@roadmap/user/types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(username: string): Promise<UserWithPassword | null> {
    return this.prisma.user.findUnique({
      where: { username },
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
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
