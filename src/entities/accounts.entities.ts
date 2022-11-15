import { Entity, 
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";
import { Transaction } from "./transactions.entities";

@Entity('accounts')
class Account {
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Column({default: 100.00})
  balance!: number;

  @OneToMany(() => Transaction, (transaction) => transaction.id)
  transactions!: Transaction[];
};

export { Account };