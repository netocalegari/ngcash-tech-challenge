import { Router } from "express";
import { createUserController } from "../controllers/user.controllers";

const userRoutes = Router();

userRoutes.post('', createUserController);

export default userRoutes;