import { NextFunction, Request, Response } from 'express';
import { verify, Secret } from 'jsonwebtoken';

require('dotenv/config');

const secretKey = process.env.JWT_SECRET || 'senhaSecreta';

export default function tokenValidation(req: Request, res: Response, next: NextFunction) {
  const { authorization: token } = req.headers;
  try {
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const user = verify(token, secretKey as Secret);
    req.body.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
