import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../modules/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private users: UsersService,
    private configService: ConfigService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.users.getUser(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { id: user.id, username: user.username, sub: user.id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async register(user: { username: string; password: string }) {
    const existing = await this.users.getUser(user.username);
    if (existing) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(user.password, 10);
    await this.users.createUser({
      ...user,
      password: hashedPassword,
    });

    return { message: 'User registered successfully' };
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      const { id, username, sub } = decoded;

      const user = await this.users.getUserById(id);
      if (!user) throw new Error('User not found');

      const newAccessToken = this.jwtService.sign(
        { id, username, sub },
        { expiresIn: '1h' }
      );

      return { access_token: newAccessToken };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}
