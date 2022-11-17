import { Router } from "express";
import { checkBalanceController, createUserController, makeTransactionController } from "../controllers/user.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
// import { createUserSchema } from "../middlewares/ensurePasswordSafety.middleware";
// import ensurePasswordSafetyMiddleware from "../middlewares/ensurePasswordSafety.middleware";

const userRoutes = Router();

userRoutes.post('/register', createUserController);
userRoutes.get('/dashboard', ensureAuthMiddleware, checkBalanceController);
userRoutes.patch('/dashboard/transaction', ensureAuthMiddleware, makeTransactionController);


export default userRoutes;