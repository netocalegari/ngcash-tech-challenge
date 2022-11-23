import { Router } from "express";
import {
  listTransactionsController,
  makeTransactionController,
} from "../controllers/user.controllers";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

const transactionRoutes = Router();

transactionRoutes.patch("", ensureAuthMiddleware, makeTransactionController);
transactionRoutes.get("", ensureAuthMiddleware, listTransactionsController);

export { transactionRoutes };
