import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { StringSanitizerService } from './services/string-sanitizer.service';
import { User } from './enities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, BcryptService, StringSanitizerService],
  exports: [UsersService],
})
export class UsersModule {}
