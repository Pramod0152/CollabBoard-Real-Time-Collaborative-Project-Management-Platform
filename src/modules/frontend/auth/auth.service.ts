import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDataService } from 'src/dal/user-data.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from 'src/dto/user/register.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { LoginDto } from 'src/dto/user/login.dto';
import { User } from 'src/dal/entities/user.entity';
import { ReadMyUserDto } from 'src/dto/user/read-my-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userData: UserDataService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.userData.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already registered');
    }
    const password = await bcrypt.hash(dto.password, 10);

    const user = await this.userData.create({
      name: dto.name,
      email: dto.email,
      password,
    });

    const { access_token, refresh_token } = await this.signJwtTokens({ sub: user.id, email: user.email });

    return { access_token, refresh_token };
  }

  async signJwtTokens(payload: any) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_AUTH_ACCESS_SECRET'),
        expiresIn: this.configService.get<number>('JWT_AUTH_ACCESS_EXPIRATION_TIME'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_AUTH_REFRESH_SECRET'),
        expiresIn: this.configService.get<number>('JWT_AUTH_REFRESH_EXPIRATION_TIME'),
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userData.findByEmail(dto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is incorrect');
    }

    const { access_token, refresh_token } = await this.signJwtTokens({ sub: user.id, email: user.email });

    return {
      access_token,
      refresh_token,
      user: this.mapper.map(user, User, ReadMyUserDto),
    };
  }
}
