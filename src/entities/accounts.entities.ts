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

  @Column()
  balance: number = 100.00;

  @OneToMany(() => Transaction, (transaction) => transaction.id)
  transactions!: Transaction[];
};

export { Account };