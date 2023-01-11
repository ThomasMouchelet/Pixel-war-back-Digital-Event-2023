import { Role } from 'src/auth/enums/roles.enum';
import { PixelEntity } from 'src/pixel/entities/pixel.entity';
import { Team } from 'src/team/entities/team.entity';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  roles: Role[];

  @ManyToOne(() => Team, (team) => team.users)
  team: Team;

  @Column({ default: 0 })
  totalScore: number;

  @OneToMany(() => PixelEntity, (pixel) => pixel.user)
  pixel: PixelEntity[];

  @Column({ default: false })
  isBan: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
