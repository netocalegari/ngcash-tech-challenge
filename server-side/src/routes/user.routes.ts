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
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensurePasswordSafetyMiddleware from "../middlewares/ensurePasswordSafety.middleware";
// import { createUserSchema } from "../middlewares/ensurePasswordSafety.middleware";
// import ensurePasswordSafetyMiddleware from "../middlewares/ensurePasswordSafety.middleware";

const userRoutes = Router();

userRoutes.post("/register", ensurePasswordSafetyMiddleware, createUserController);
userRoutes.get("/dashboard", ensureAuthMiddleware, checkBalanceController);
userRoutes.patch(
  "/dashboard/transaction",
  ensureAuthMiddleware,
  makeTransactionController
);
userRoutes.get(
  "/dashboard/transaction",
  ensureAuthMiddleware,
  listTransactionsController
);
userRoutes.post(
  "/dashboard/transaction/filter/date",
  ensureAuthMiddleware,
  filterDateTransactionsController
);
userRoutes.get(
  "/dashboard/transaction/filter/cashIn",
  ensureAuthMiddleware,
  filterCashInTransactionsController
);
userRoutes.get(
  "/dashboard/transaction/filter/cashOut",
  ensureAuthMiddleware,
  filterCashOutTransactionsController
);

export default userRoutes;
