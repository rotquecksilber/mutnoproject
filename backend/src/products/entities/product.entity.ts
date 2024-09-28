import { Entity, Column, Unique } from 'typeorm';
import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('products')
@Unique(['number']) // Обеспечиваем уникальность поля number
export class Product extends BaseEntity {
  @IsString()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @IsNumber()
  @Column({ type: 'int' })
  number: number;

  @IsNumber()
  @Column({ type: 'decimal' })
  price: number;

  @IsOptional()
  @IsNumber()
  @Column({ type: 'decimal', nullable: true })
  discount: number;

  @IsArray()
  @IsString({ each: true })
  @Column({ type: 'text', array: true })
  composition: string[];

  @IsArray()
  @IsString({ each: true })
  @Column({ type: 'text', array: true })
  size: string[];

  @IsArray()
  @IsString({ each: true })
  @Column({ type: 'text', array: true })
  color: string[];

  @IsNumber()
  @Column({ type: 'int' })
  year: number;

  @IsString()
  @Column({ type: 'text' })
  description1: string;

  @IsOptional()
  @IsString()
  @Column({ type: 'text', nullable: true })
  description2: string;

  @IsOptional()
  @IsString()
  @Column({ type: 'text', nullable: true })
  description3: string;

  @IsArray()
  @IsString({ each: true })
  @Column({ type: 'text', array: true })
  picture: string[];

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
