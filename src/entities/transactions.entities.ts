import { Entity, 
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne
} from "typeorm";
import { Account } from "./accounts.entities";

@Entity('transacions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @CreateDateColumn({type: 'date'})
  created_at!: Date;

  @ManyToOne(() => Account, (account) => account.id)
  debited_account!: Account;

  @ManyToOne(() => Account, (account) => account.id)
  credited_account!: Account;

  @Column({type: 'decimal', precision: 12, scale: 2})
  value!: number;
};

export { Transaction };