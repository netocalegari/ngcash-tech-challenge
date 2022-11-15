import { hash } from "bcrypt";
import AppDataSource from "../../data-source";
import { Account } from "../../entities/accounts.entities";
import { User } from "../../entities/users.entities";
import { AppError } from "../../errors/appError";
import { IUser, IUserRequest } from "../../interfaces/user";

const createUserService = async ({username, password}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const accountRepository = AppDataSource.getRepository(Account);

  
  if (!username) {
    throw new AppError(400, 'Missing username');
  };

  if (!password) {
    throw new AppError(400, 'Missing password');
  };

  const usernameAlreadyExists = await userRepository.findOneBy({
    username: username
  });

  if (usernameAlreadyExists) {
    throw new AppError(400, 'Username already in use');
  };
  
  const hashedpassword = await hash(password, 10);

  const newAccount = accountRepository.create();

  const user = new User();
  user.username = username;
  user.password = hashedpassword;
  user.account_id = newAccount;

  userRepository.create(user);
  userRepository.save(user);


  return user;
}

export default createUserService;