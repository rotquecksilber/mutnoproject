import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('contacts')
export class Contact extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  tg: string;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'text', nullable: true })
  note?: string;
}
