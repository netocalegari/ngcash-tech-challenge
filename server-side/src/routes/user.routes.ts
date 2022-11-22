import { Router } from "express";
import {
  checkBalanceController,
  createUserController,
  filterCashInTransactionsController,
  filterCashOutTransactionsController,
  filterDateTransactionsController,
  listTransactionsController,
  makeTransactionController,
} from "../controllers/user.controllers";
import {ensureAuthMiddleware} from "../middlewares/ensureAuth.middleware";
import { ensurePasswordSafetyMiddleware } from "../middlewares/ensurePasswordSafety.middleware";

const userRoutes = Router();

userRoutes.post(
  "/register",
  ensurePasswordSafetyMiddleware,
  createUserController
);
userRoutes.get("/user", ensureAuthMiddleware, checkBalanceController);
userRoutes.patch(
  "/transaction",
  ensureAuthMiddleware,
  makeTransactionController
);
userRoutes.get(
  "/transaction",
  ensureAuthMiddleware,
  listTransactionsController
);
userRoutes.post(
  "/transaction/filter/date",
  ensureAuthMiddleware,
  filterDateTransactionsController
);
userRoutes.get(
  "/transaction/filter/cashIn",
  ensureAuthMiddleware,
  filterCashInTransactionsController
);
userRoutes.get(
  "/transaction/filter/cashOut",
  ensureAuthMiddleware,
  filterCashOutTransactionsController
);

export { userRoutes };
