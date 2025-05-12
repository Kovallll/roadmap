import { IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'john_doe',
  })
  username: string;

  @IsString()
  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'strong_password',
  })
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Аватар пользователя',
  })
  avatar?: string;
}
