import IMatch from '../interfaces/IMatch';
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

  async matchUpdate(id: number, homeTeam: number, awayTeam: number): Promise<number> {
    const [match] = await this._matchModel
      .update({ homeTeamGoals: homeTeam, awayTeamGoals: awayTeam }, { where: { id } });
    return match;
  }

  async matchCreate(match: IMatch): Promise<IMatch | null> {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress } = match;
    if (inProgress === true) {
      return null;
    }
    const newMatch = await this._matchModel.create({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress,
    });

    return newMatch as unknown as IMatch;
  }
}
