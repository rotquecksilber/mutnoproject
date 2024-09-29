import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { createWinstonConfig } from '../configs/winston.config';

import { ThrottlerModule } from '@nestjs/throttler';
import { getTypeOrmConfig } from '../configs/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { ProductModule } from './products/product.module';
import { StoresModule } from './stores/stores.module';
import { NotificationModule } from './notification/notification.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    WinstonModule.forRoot(createWinstonConfig()),
    BcryptModule,
    UsersModule,
    AuthModule,
    ProductModule,
    StoresModule,
    NotificationModule,
    ContactsModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
