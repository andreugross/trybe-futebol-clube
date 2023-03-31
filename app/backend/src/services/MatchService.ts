import Match from '../database/models/Match';
import Team from '../database/models/Team';

export default class MatchService {
  constructor(
    private _matchModel: typeof Match,
  ) {}

  getAllMatches = async () => {
    const matches = await this._matchModel.findAll({
      include: [
        {
          model: Team,
          association: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: Team,
          association: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return matches;
  };
}
