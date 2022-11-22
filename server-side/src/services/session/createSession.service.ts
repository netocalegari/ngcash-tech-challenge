import AppDataSource from "../../data-source";
import { ISessionRequest } from "../../interfaces/session";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/users.entities";
import { compare } from "bcrypt";

const createSessionService = async ({
  username,
  password,
}: ISessionRequest): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    username: username,
  });

  if (!user) {
    throw new AppError(403, "Invalid email/password");
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError(403, "Invalid email/password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: user.id,
    }
  );

  return token;
};

export { createSessionService };
