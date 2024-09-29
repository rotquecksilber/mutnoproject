import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../src/users/enities/user.entity';
import { Product } from '../src/products/entities/product.entity';
import { Store } from '../src/stores/entities/store.entity';
import { Contact } from '../src/contacts/entities/contact.entity';

/* Получение опций */
export const getTypeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return getTypeOrmOptions(configService);
};

/* Получение опций */
const getTypeOrmOptions = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [User, Product, Store, Contact],
  synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
});
