import { Entity, Column, Unique } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { BaseEntity } from '../../common/entities/base.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
@Unique(['email', 'username']) // Обеспечиваем уникальность полей email и username
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'user'],
    default: 'user',
  })
  @IsString()
  @IsNotEmpty()
  role: 'admin' | 'user';
}
