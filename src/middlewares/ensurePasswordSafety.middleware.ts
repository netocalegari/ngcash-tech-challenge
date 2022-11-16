// import { Request, Response, NextFunction} from 'express';
// import { AppError } from '../errors/appError';
// import * as yup from 'yup';
// import { SchemaOf } from 'yup';
// import { IUserRequest } from '../interfaces/user';

// export const createUserSchema: SchemaOf<IUserRequest> = yup.object().shape({
//   password: yup.string()
//     .min(8)
//     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'Deve must have at least 8 characters, one uppercase letter, one lowercase letter, one number and a special character')
// });

// export const validatePassword = (schema: SchemaOf<IUserRequest>) => {
//   async (
//     req: Request,
//     res: Response,
//     next: NextFunction) => {
//       try {
//         const data = req.body;

//         try {
//           const validatedData = await schema.validate(
//             data,
//             {
//               abortEarly: false,
//               stripUnknown: true
//             })
            
//             req.newUser = validatedData;

//             return next();
//           } catch(err: any) {
//             return res.status(400).json({
//               error: err.errors?.join(', ')
//               })
//             }
//       } catch(err) {
//         return next(err);
//     };
//   };
// };



// const ensurePasswordSafetyMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const { password } = req.body;

//   if (password.includes('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$')) {
//     throw new AppError(400, 'Password must have at least 8 characters, one uppercase letter, one lowercase letter and a number');
//   };

//   if (!password.split('').includes(/^(.*[A-Z].*)$/)) {
//     throw new AppError(400, 'Password must have at least one uppercase letter')
//   }

//   if (!password.split('').includes(/^(.*[0-9].*)$/)) {
//     throw new AppError(400, 'Password must have at least one number')
//   }

//   return next();
// };

// export default ensurePasswordSafetyMiddleware;
