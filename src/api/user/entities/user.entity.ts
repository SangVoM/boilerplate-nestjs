import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 30 })
  firstName!: string;

  @Column({ length: 30 })
  lastName!: string;

  @Column({ length: 100, unique: true })
  email!: string;

  @Column({ length: 20 })
  phone!: string;

  @Column({ length: 60 })
  password!: string;

  @Column({ default: false })
  delete!: boolean;

  @Column()
  refreshToken: string;

  @CreateDateColumn({
    name: 'created_at',
    default: `now()`,
    nullable: true,
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    default: `now()`,
    nullable: true,
  })
  updatedAt: string;

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
