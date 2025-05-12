import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

import { HttpExceptionFilter } from '@/filters/HttpExceptionFilter';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import {
  Body,
  Controller,
  Post,
  Request,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }

  @Post('refresh')
  async refreshToken(@Body() body: { refresh_token: string }) {
    return this.authService.refreshToken(body.refresh_token);
  }
}
