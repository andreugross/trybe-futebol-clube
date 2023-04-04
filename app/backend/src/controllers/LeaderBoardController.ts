import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  constructor(
    private _leaderBoardService: LeaderBoardService,
  ) {}

  async getHomeTeamLeaderboard(req: Request, res: Response): Promise<Response> {
    const leaderboard = await this._leaderBoardService.getHomeTeamLeaderboard();
    return res.status(200).json(leaderboard);
  }
}
