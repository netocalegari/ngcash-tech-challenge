import express, { NextFunction, Request, Response } from 'express';
import { AppError } from './errors/appError';
import sessionRoutes from './routes/session.routes';

const app = express();
app.use(express.json());

app.use('/login', sessionRoutes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  };

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;