import { Router } from "express";
import {
  checkBalanceController,
  createUserController,
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

export { userRoutes };
