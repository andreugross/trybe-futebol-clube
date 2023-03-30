import { NextFunction, Request, Response } from 'express';

export default function loginValidation(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  const isEmail = emailRegex.test(email);

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (!isEmail || password.length <= 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
}
