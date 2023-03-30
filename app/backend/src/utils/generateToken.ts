import { sign, verify, SignOptions, JwtPayload } from 'jsonwebtoken';

require('dotenv/config');

const secretKey = process.env.JWT_SECRET || 'senhaSecreta';

const jwtConfig: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

export function createToken(email: string) {
  const token = sign({ email }, secretKey, jwtConfig);
  return token;
}

export function validateToken(authorization: string): JwtPayload {
  const validate = verify(authorization, secretKey) as JwtPayload;
  return validate;
}
