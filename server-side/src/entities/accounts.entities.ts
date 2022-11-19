import { Exclude } from "class-transformer";
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
  @Exclude()
  balance: number = 100.00;

  @OneToMany(() => Transaction, (transaction) => transaction.id)
  credited_transactions!: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.id)
  debited_transactions!: Transaction[];
};

export { Account };