import AppDataSource from "../../data-source";
import { Transaction } from "../../entities/transactions.entities";
import { User } from "../../entities/users.entities";
import { AppError } from "../../errors/appError";

const filterCashInTransactionsService = async (
  id: string
): Promise<Transaction[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const transactionsRepository = AppDataSource.getRepository(Transaction);

  const user = await userRepository.findOneBy({
    id: id,
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const cashInTransactions = await transactionsRepository.find({
    where: {
      credited_account: user.account_id,
    },
  });

  if (cashInTransactions.length < 1) {
    throw new AppError(404, "No transactions found");
  }

  return cashInTransactions;
};

export default filterCashInTransactionsService;
