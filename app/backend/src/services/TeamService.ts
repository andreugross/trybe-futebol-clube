import Team from '../database/models/Team';

export default class TeamService {
  constructor(
    private _teamModel: typeof Team,
  ) {}

  async getAllTeams(): Promise<Team[]> {
    const teams = await this._teamModel.findAll();

    return teams;
  }

  async findTeamById(id: number): Promise<Team | null> {
    const team = await this._teamModel.findOne({ where: { id } });
    return team;
  }
}
