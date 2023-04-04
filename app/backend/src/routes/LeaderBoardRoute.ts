import { Request, Response, Router } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';
import LeaderBoardController from '../controllers/LeaderBoardController';
import Team from '../database/models/Team';
import Match from '../database/models/Match';

const leaderboard = new LeaderBoardController(new LeaderBoardService(Match, Team));
const leaderboardRouter = Router();

leaderboardRouter.get('/home', (req: Request, res: Response) =>
  leaderboard.getHomeTeamLeaderboard(req, res));

export default leaderboardRouter;
