import { Request, Response, Router } from 'express';
import TeamService from '../services/TeamService';
import TeamController from '../controllers/TeamController';
import Team from '../database/models/Team';

const team = new TeamController(new TeamService(Team));
const teamRouter = Router();

teamRouter.get('/', (req: Request, res: Response) =>
  team.getAllTeams(req, res));

teamRouter.get('/:id', (req: Request, res: Response) =>
  team.findTeamById(req, res));

export default teamRouter;
