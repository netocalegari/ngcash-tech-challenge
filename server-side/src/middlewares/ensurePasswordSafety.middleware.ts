import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

const ensurePasswordSafetyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;

  const passwordErrors = [];

  if (password.length < 8) {
    passwordErrors.push(" Password must contain at least 8 characters");
  }

  if (!new RegExp(/^(.*[A-Z].*)$/).test(password)) {
    passwordErrors.push(" Password must contain at least one uppercase letter");
  }

  if (!new RegExp(/^(.*[0-9].*)$/).test(password)) {
    passwordErrors.push(" Password must contain at least one number");
  }

  if (passwordErrors.length > 0) {
    throw new AppError(400, passwordErrors.toString().replace(/^[^\s]*\s/, ""));
  }

  return next();
};

export { ensurePasswordSafetyMiddleware };
