import * as fs from 'fs';
import * as path from 'path';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      privateKey: fs.readFileSync(
        path.resolve(
          process.env.JWT_PRIVATE_KEY || './src/config/keys/private.key',
        ),
      ),
      publicKey: fs.readFileSync(
        path.resolve(
          process.env.JWT_PUBLIC_KEY || './src/config/keys/public.key',
        ),
      ),
      signOptions: { algorithm: 'RS256', expiresIn: '1h' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
