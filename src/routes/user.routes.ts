import { Router } from "express";
import { createUserController } from "../controllers/user.controllers";
// import ensurePasswordSafetyMiddleware from "../middlewares/ensurePasswordSafety.middleware";

const userRoutes = Router();

userRoutes.post('', createUserController);

export default userRoutes;