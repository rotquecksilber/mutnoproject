import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalGuard } from './guards/local.guard';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { User } from '../users/enities/user.entity';
import { UsersService } from '../users/users.service';
import { StringSanitizerService } from '../users/services/string-sanitizer.service';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '10d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    LocalGuard,
    ConfigService,
    UsersService,
    BcryptService,
    StringSanitizerService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
