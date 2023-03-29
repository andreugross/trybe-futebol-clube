import * as express from 'express';
import TeamService from '../services/TeamService';
import TeamController from '../controllers/TeamController';
import Team from '../database/models/Team';

const team = new TeamController(new TeamService(Team));
const teamRouter = express.Router();

teamRouter.get('/', (req: express.Request, res: express.Response) =>
  team.getAllTeams(req, res));

teamRouter.get('/:id', (req: express.Request, res: express.Response) =>
  team.findTeamById(req, res));

export default teamRouter;
