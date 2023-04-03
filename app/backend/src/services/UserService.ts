import { compareSync } from 'bcryptjs';
import ILogin from '../interfaces/ILogin';
import User from '../database/models/User';
import IUser from '../interfaces/IUser';
import { createToken, validateToken } from '../utils/generateToken';

export default class UserService {
  constructor(
    private _userModel: typeof User,
  ) {}

  async login(userLogin: ILogin): Promise<IUser | null> {
    const user = await this._userModel.findOne(
      { where: { email: userLogin.email } },
    );
    if (!user) return null;

    const decode = compareSync(userLogin.password, user.password);
    if (!decode) return null;

    const { id, username, role, email } = user;
    const token = createToken(email);

    return {
      user: { id, username, role, email },
      token,
    };
  }

  async getRole(authorization: string): Promise<object | null> {
    const { email } = validateToken(authorization);
    const user = await this._userModel.findOne({ where: { email }, raw: true });
    if (!user) return null;
    return user;
  }
}
