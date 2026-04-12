import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const jwt_secret = configService.get<string>('JWT_AUTH_ACCESS_SECRET');

    if (!jwt_secret) {
      throw new Error('jwt_secret is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwt_secret,
    });
  }

  validate(payload: { sub: number | string; email: string }) {
    return { id: payload.sub, email: payload.email };
  }
}
