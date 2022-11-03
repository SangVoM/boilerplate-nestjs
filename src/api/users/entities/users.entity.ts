import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 30 })
  firstName!: string;

  @Column({ length: 30 })
  lastName!: string;

  @Column({ length: 50, unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  delete!: boolean;

  @Column()
  refreshToken: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
