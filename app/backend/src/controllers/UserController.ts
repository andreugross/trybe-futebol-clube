import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(
    private _userService: UserService,
  ) {}

  async login(req: Request, res: Response): Promise<Response | void> {
    try {
      const token = await this._userService.login(req.body);
      if (!token) return res.status(401).json({ message: 'Invalid email or password' });
      return res.status(200).json(token);
    } catch (error) {
      return res.send(error);
    }
  }

  async validate(req: Request, res: Response): Promise<Response | void> {
    try {
      const { authorization } = req.headers;
      const token = await this._userService.getRole(authorization as string);
      if (!authorization) return res.status(401).json({ message: 'User does not exist' });
      res.status(200).json(token);
    } catch (error) {
      return res.send(error);
    }
  }
}
