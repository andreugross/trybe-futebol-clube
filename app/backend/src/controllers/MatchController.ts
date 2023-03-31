import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private _matchService: MatchService,
  ) {}

  getAllMatches = async (req: Request, res: Response) => {
    const matches = await this._matchService.getAllMatches();
    return res.status(200).json(matches);
  };
}
