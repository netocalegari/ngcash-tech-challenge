import AppDataSource from "../../data-source";
import { Transaction } from "../../entities/transactions.entities";
import { User } from "../../entities/users.entities";
import { AppError } from "../../errors/appError";

const filterDateTransactionsService = async (
  id: string,
  date: Date
): Promise<Transaction[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const transactionsRepository = AppDataSource.getRepository(Transaction);

  const user = await userRepository.findOneBy({
    id: id,
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const transactions = await transactionsRepository.find({
    where: {
      created_at: date,
    },
  });

  if (transactions.length < 1 || !date) {
    throw new AppError(404, "No transactions found at this date");
  }

  return transactions;
};

export { filterDateTransactionsService };
