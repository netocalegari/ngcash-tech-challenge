import AppDataSource from "../../data-source";
import { Transaction } from "../../entities/transactions.entities";
import { User } from "../../entities/users.entities";
import { AppError } from "../../errors/appError";

const listTransactionsService = async (id: string): Promise<Transaction[]> => {
  const transactionsRepository = AppDataSource.getRepository(Transaction);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: id
  });

  if (!user ) {
    throw new AppError(404, 'User not found');
  };

  const transactions = await transactionsRepository.find({
    where: [{
      debited_account: user.account_id
    },
    {
      credited_account: user.account_id
    }]
  });

  if (transactions.length < 1) {
    throw new AppError(404, 'No transactions have been made involving this account')
  };

  return transactions;
};

export default listTransactionsService;