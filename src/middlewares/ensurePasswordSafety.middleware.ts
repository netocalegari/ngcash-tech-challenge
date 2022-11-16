import { Request, Response, NextFunction} from 'express';
import { AppError } from '../errors/appError';

const ensurePasswordSafetyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (password.length < 8) {
    throw new AppError(400, 'Password must have at least 8 characters');
  };

  if (!password.split('').includes(/^(.*[A-Z].*)$/)) {
    throw new AppError(400, 'Password must have at least one uppercase letter')
  }

  if (!password.split('').includes(/^(.*[0-9].*)$/)) {
    throw new AppError(400, 'Password must have at least one number')
  }

  return next();
};

export default ensurePasswordSafetyMiddleware;