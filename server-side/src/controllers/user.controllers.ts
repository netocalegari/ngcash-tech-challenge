import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import { checkBalanceService } from "../services/user/checkBalance.service";
import { createUserService } from "../services/user/createUser.service";
import { listTransactionsService } from "../services/user/listTransactions.service";
import { makeTransaction } from "../services/user/makeTransaction.service";

const createUserController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const newUser = await createUserService({ username, password });

    return res.status(201).json(instanceToPlain(newUser));
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

const checkBalanceController = async (req: Request, res: Response) => {
  const id = req.user.id;

  try {
    const balance = await checkBalanceService(id);

    return res.status(200).json(balance);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

const makeTransactionController = async (req: Request, res: Response) => {
  const fromUserId = req.user.id;
  const { username, amount } = req.body;

  try {
    const transaction = await makeTransaction({ fromUserId, username, amount });

    return res.status(200).json(instanceToPlain(transaction));
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

const listTransactionsController = async (req: Request, res: Response) => {
  const id = req.user.id;

  try {
    const transactions = await listTransactionsService(id, req.query);

    return res.status(200).json(transactions);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export {
  createUserController,
  checkBalanceController,
  makeTransactionController,
  listTransactionsController,
};
