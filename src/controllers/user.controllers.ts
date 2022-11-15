import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import createUserService from "../services/user/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const newUser = await createUserService({username, password});

    return res.status(201).json(instanceToPlain(newUser)); 
  } catch(err) {
    if (err instanceof AppError) {
      handleError(err, res);
    };  
  };
};

export { createUserController }