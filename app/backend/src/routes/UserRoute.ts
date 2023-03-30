import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';
import User from '../database/models/User';
import loginValidation from '../middlewares/LoginValidation';
import tokenValidation from '../middlewares/TokenValidation';

const userController = new UserController(new UserService(User));

const userRouter = Router();

userRouter.post('/', loginValidation, (req: Request, res: Response) =>
  userController.login(req, res));
userRouter.get('/role', tokenValidation, (req: Request, res: Response) =>
  userController.validate(req, res));

export default userRouter;
