import { Entity, Column } from 'typeorm';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('stores')
export class Store extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ type: 'text' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  link: string;

  @Column({ type: 'boolean', default: true })
  @IsBoolean()
  isActive: boolean;
}
