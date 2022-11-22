import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Account } from "./accounts.entities";

@Entity("transactions")
class Transaction {
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @CreateDateColumn({ type: "date" })
  created_at!: Date;

  @ManyToOne(() => Account, (account) => account.id, {eager: true})
  debited_account!: Account;

  @ManyToOne(() => Account, (account) => account.id, {eager: true})
  credited_account!: Account;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  value!: number;
}

export { Transaction };
