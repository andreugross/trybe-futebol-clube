import { Request, Response } from 'express';
import Team from '../database/models/Team';
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

  async matchUpdate(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;

      await this._matchService.matchUpdate(Number(id), homeTeamGoals, awayTeamGoals);
      return res.status(200).json({ message: 'Updated' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async matchcreate(req: Request, res: Response): Promise<Response> {
    try {
      const { homeTeamId, awayTeamId } = req.body;
      const data = req.body;
      if (homeTeamId === awayTeamId) {
        return res.status(422)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }
      const isTeam = await Team.findAll({ where: { id: [homeTeamId, awayTeamId] } });
      if (isTeam.length !== 2) {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }

      const newCreation = await this._matchService.matchCreate(data);
      return res.status(201).json(newCreation);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
