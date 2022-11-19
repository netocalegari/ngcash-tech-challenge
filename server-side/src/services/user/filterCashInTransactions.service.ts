import { Between, MoreThan } from "typeorm";
import { date } from "yup";
import AppDataSource from "../../data-source";
import { Transaction } from "../../entities/transactions.entities";
import { User } from "../../entities/users.entities";
import { AppError } from "../../errors/appError";

const filterCashInTransactionsService = async (id: string): Promise<Transaction[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const transactionsRepository = AppDataSource.getRepository(Transaction);

  const user = await userRepository.findOneBy({
    id: id
  });

  if (!user) {
    throw new AppError(404, 'User not found');
  };

  const cashInTransactions = await transactionsRepository.find({
    where: {
      credited_account: user.account_id
    }
  });

  if (cashInTransactions.length < 1) {
    throw new AppError(404, 'No transactions found');
  };

  return cashInTransactions;  

  // let transactions = [];

  // const cashInTransactions = await transactionsRepository.createQueryBuilder('transaction')
  //   .where

  // const cashInTransactions = user.account_id.credited_transactions;
  // const cashOutTransactions = user.account_id.debited_transactions;
  // const allTransactions = [...cashInTransactions, ...cashOutTransactions];

  // if (cashIn && cashOut) {
  //   transactions = await transactionsRepository.find({
  //     where: [{
  //       credited_account: user.account_id,
  //       created_at: Between(initialDate, finalDate)
  //     }, {
  //       debited_account: user.account_id,
  //       created_at: Between(initialDate, finalDate)
  //     }]
  //   });    
  // } else if (cashIn) {
  //   transactions = await transactionsRepository.find({
  //     where: {
  //       credited_account: user.account_id,
  //       created_at: Between(initialDate, finalDate)
  //     }
  //   });
  // } else if (cashOut) {
  //   transactions = await transactionsRepository.find({
  //     where: {
  //       debited_account: user.account_id,
  //       created_at: Between(initialDate, finalDate)
  //     }
  //   }); 

  //   return transactions;
  // }
};

export default filterCashInTransactionsService;