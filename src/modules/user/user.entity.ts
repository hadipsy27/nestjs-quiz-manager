import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from './enum/user.enum';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'doe@email.com',
    description: 'User email',
    required: true,
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: 'Password@123',
    description: 'User password',
    required: true,
  })
  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.MEMBER })
  role: UserRoles;

  @ApiProperty({
    description: 'When the user was created',
  })
  @CreateDateColumn()
  createAt: Date;

  @ApiProperty({
    description: 'When the user was updated',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
