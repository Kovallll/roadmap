import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

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
