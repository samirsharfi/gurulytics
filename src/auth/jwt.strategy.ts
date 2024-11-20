import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as fs from 'fs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: fs.readFileSync(
        process.env.JWT_PUBLIC_KEY || './src/config/keys/public.key',
      ),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    // This is where you could perform further validation (e.g., user lookup)
    return { userId: payload.sub, email: payload.email };
  }
}
