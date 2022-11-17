import AppDataSource from "../../data-source";
import { Account } from "../../entities/accounts.entities";
import { Transaction } from "../../entities/transactions.entities";
import { User } from "../../entities/users.entities";
import { AppError } from "../../errors/appError";
import { ITransactionRequest } from "../../interfaces/user";

const makeTransaction = async ({fromUserId, username, amount}: ITransactionRequest): Promise<Transaction> => {
  const userRepository = AppDataSource.getRepository(User);
  const accountRepository = AppDataSource.getRepository(Account);
  const transactionRepository = AppDataSource.getRepository(Transaction);

  
  const sendingUser = await userRepository.findOneBy({
    id: fromUserId
  });
  
  if (!sendingUser) {
    throw new AppError(404, 'User not found');
  };

  const sendingUserAccount = await accountRepository.findOneBy({
    id: sendingUser.account_id.id
  });

  if (amount > sendingUserAccount!.balance) {
    throw new AppError(400, 'Amount value is bigger than balance value');
  };

  const receivingUser = await userRepository.findOneBy({
      username: username
    }
  );

  if (!receivingUser) {
    throw new AppError(404, 'User not found');
  };

  if (sendingUser.username === receivingUser.username) {
    throw new AppError(400, 'You cannot make a transfer to your own account');
  };

  const receivingUserAccount = receivingUser.account_id;


  await accountRepository.update(
    sendingUserAccount!.id,
    {
      balance: sendingUserAccount!.balance - amount
    }
  );

  await accountRepository.update(
    receivingUserAccount!.id,
    {
      balance: receivingUserAccount!.balance + amount
    }
  );

  const completedTransaction = new Transaction();
  completedTransaction.credited_account = receivingUserAccount;
  completedTransaction.debited_account = sendingUserAccount!;
  completedTransaction.value = amount;

  transactionRepository.create(completedTransaction);
  transactionRepository.save(completedTransaction);


  return completedTransaction;
};

export default makeTransaction;