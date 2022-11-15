import { Entity,
  Column,
  PrimaryGeneratedColumn, 
  OneToOne, 
  JoinColumn 
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Account } from './accounts.entities';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Column()
  username!: string;

  @Column()
  @Exclude()
  password!: string;

  @OneToOne(() => Account)
  @JoinColumn()
  account_id!: Account;
};

export { User };