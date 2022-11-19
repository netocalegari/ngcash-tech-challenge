import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entities";
import { AppError } from "../../errors/appError";

const checkBalanceService = async (id: string): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: id
    },
    relations: {
      account_id: true
    }
  });

  if (!user) {
    throw new AppError(404, 'User not found');
  };

  return user;
};

export default checkBalanceService;