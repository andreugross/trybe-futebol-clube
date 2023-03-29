import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(
    private _teamService: TeamService,
  ) {}

  async getAllTeams(_req: Request, res: Response): Promise<Response> {
    const teams = await this._teamService.getAllTeams();

    return res.status(200).json(teams);
  }

  async findTeamById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const team = await this._teamService.findTeamById(Number(id));

    return res.status(200).json(team);
  }
}
