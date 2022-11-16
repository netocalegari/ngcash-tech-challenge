import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entities";
// import { ITransactionRequest } from "../../interfaces/user";

const makeTransaction = async (fromUserId: string, toUsername: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const sendingUser = await userRepository.findOneBy({
    id: fromUserId,
  });

  const receiveingUser = await userRepository.findOneBy({
    username: toUsername,
  })

  return receiveingUser;
};

export default makeTransaction;