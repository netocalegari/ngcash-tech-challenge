import AppDataSource from "../../data-source";
import { Transaction } from "../../entities/transactions.entities";
import { User } from "../../entities/users.entities";
import { AppError } from "../../errors/appError";

interface IParams {
  operation?: 'cashOut' | 'cashIn'
  'transaction-date'?: Date  
}

const listTransactionsService = async (id: string, params?: IParams): Promise<Transaction[]> => {
  const transactionsRepository = AppDataSource.getRepository(Transaction);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: id,
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const transactions = await transactionsRepository.find({
    where: [
      {
        debited_account: user.account_id,
      },
      {
        credited_account: user.account_id,
      },
    ],
  });

  if (params?.operation === 'cashOut') {
    const cashOutTransactions = transactions.filter(transaction => transaction.debited_account.id === user.account_id.id);
    return cashOutTransactions;
  }

  if (params?.operation === 'cashIn') {
    const cashInTransactions = transactions.filter(transaction => transaction.credited_account.id === user.account_id.id);
    return cashInTransactions;
  }

  if (params?.['transaction-date']) {
    const sameDateTransactions = transactions.filter(transaction => new Date(transaction.created_at).getDay() === new Date(params?.['transaction-date']!).getDay());
    return sameDateTransactions;
  }

  return transactions;
};

export { listTransactionsService };
