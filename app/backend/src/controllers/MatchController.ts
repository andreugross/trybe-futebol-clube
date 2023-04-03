import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private _matchService: MatchService,
  ) {}

  async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    let matches;

    if (inProgress) {
      matches = await this._matchService.getMatchesByProgress(inProgress === 'true');
    } else {
      matches = await this._matchService.getAllMatches();
    }
    return res.status(200).json(matches);
  }

  async matchFinisher(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this._matchService.matchFinisher(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
