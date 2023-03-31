import { Request, Response, Router } from 'express';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';
import Match from '../database/models/Match';

const match = new MatchController(new MatchService(Match));
const matchRouter = Router();

matchRouter.get('/', (req: Request, res: Response) => match.getAllMatches(req, res));

export default matchRouter;
