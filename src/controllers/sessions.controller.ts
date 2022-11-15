import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import { ISessionRequest } from "../interfaces/session";
import createSessionService from "../services/session/createSession.service";

const createSessionController = async (req: Request, res: Response) => {
  try {
    const { username, password }: ISessionRequest = req.body;

    const token = await createSessionService({username, password});

    return res.status(200).json({token});
  } catch(err) {
    if (err instanceof AppError) {
      handleError(err, res);
    };
  };
};

export { createSessionController };