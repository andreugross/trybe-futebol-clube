import Match from '../database/models/Match';
import Team from '../database/models/Team';

export default class MatchService {
  constructor(
    private _matchModel: typeof Match,
  ) {}

  async getAllMatches(): Promise<Match[]> {
    const matches = await this._matchModel.findAll({
      include: [
        { model: Team, association: 'homeTeam', attributes: ['teamName'] },
        { model: Team, association: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  async getMatchesByProgress(inProgress: boolean): Promise<Match[]> {
    const matches = await this._matchModel.findAll({
      where: { inProgress },
      include: [
        { model: Team, association: 'homeTeam', attributes: ['teamName'] },
        { model: Team, association: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  async matchFinisher(id: number): Promise<number> {
    const [match] = await this._matchModel.update(
      { inProgress: false },
      { where: { id } },
    );
    return match;
  }
}
