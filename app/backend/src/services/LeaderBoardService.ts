import ILeaderBoard from '../interfaces/ILeaderBoard';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import ITeam from '../interfaces/ITeam';

export default class LeaderBoardService {
  constructor(
    private _matchModel: typeof Match,
    private _teamModel: typeof Team,
  ) {}

  static filterMatchesByHomeTeam(id: number, matches: Match[]) {
    return matches.filter((match) => match.homeTeamId === id);
  }

  static filterMatchesByAwayTeam(id: number, matches: Match[]) {
    return matches.filter((match) => match.awayTeamId === id);
  }

  static totalPoints(victories: number, draws: number) {
    return victories * 3 + draws;
  }

  static totalGames(id: number, matches: Match[]) {
    return matches.reduce((acc, curr) => {
      if (curr.homeTeamId === id) return acc + 1;
      if (curr.awayTeamId === id) return acc + 1;
      return acc;
    }, 0);
  }

  static totalVictories(id: number, matches: Match[]) {
    return matches.reduce((acc, curr) => {
      if (curr.homeTeamId === id) {
        return curr.homeTeamGoals > curr.awayTeamGoals ? acc + 1 : acc;
      }
      if (curr.awayTeamId === id) {
        return curr.awayTeamGoals > curr.homeTeamGoals ? acc + 1 : acc;
      }
      return acc;
    }, 0);
  }

  static totalDraws(id: number, matches: Match[]) {
    return matches.reduce((acc, curr) => {
      if (curr.homeTeamId === id) {
        return curr.homeTeamGoals === curr.awayTeamGoals ? acc + 1 : acc;
      }
      if (curr.awayTeamId === id) {
        return curr.awayTeamGoals === curr.homeTeamGoals ? acc + 1 : acc;
      }
      return acc;
    }, 0);
  }

  static totalLosses(id: number, matches: Match[]) {
    return matches.reduce((acc, curr) => {
      if (curr.homeTeamId === id) {
        return curr.homeTeamGoals < curr.awayTeamGoals ? acc + 1 : acc;
      }
      if (curr.awayTeamId === id) {
        return curr.awayTeamGoals < curr.homeTeamGoals ? acc + 1 : acc;
      }
      return acc;
    }, 0);
  }

  static goalsFavor(id: number, matches: Match[]) {
    return matches.reduce((acc, curr) => {
      if (curr.homeTeamId === id) return acc + curr.homeTeamGoals;
      if (curr.awayTeamId === id) return acc + curr.awayTeamGoals;
      return acc;
    }, 0);
  }

  static goalsOwn(id:number, matches:Match[]) {
    return matches.reduce((acc, curr) => {
      if (curr.homeTeamId === id) return acc + curr.awayTeamGoals;
      if (curr.awayTeamId === id) return acc + curr.homeTeamGoals;
      return acc;
    }, 0);
  }

  static goalsBalance(goalsFavor: number, goalsOwn: number) {
    return goalsFavor - goalsOwn;
  }

  static efficiency(totalPoints: number, totalGames: number) {
    return Number((totalPoints / (totalGames * 3)) * 100).toFixed(2) || null;
  }

  static mainTable(id: number, teamName: string, matches:Match[]) {
    return {
      name: teamName,
      totalPoints: this.totalVictories(id, matches) * 3 + this.totalDraws(id, matches),
      totalGames: this.totalGames(id, matches),
      totalVictories: this.totalVictories(id, matches),
      totalDraws: this.totalDraws(id, matches),
      totalLosses: this.totalLosses(id, matches),
      goalsFavor: this.goalsFavor(id, matches),
      goalsOwn: this.goalsOwn(id, matches),
      goalsBalance: this.goalsBalance(this.goalsFavor(id, matches), this.goalsOwn(id, matches)),
      efficiency: this.efficiency(
        this.totalVictories(id, matches) * 3 + this.totalDraws(id, matches),
        this.totalGames(id, matches),
      ),
    };
  }

  static sortLeaderBoard(leaderBoard: ILeaderBoard[]) {
    return leaderBoard.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsOwn > b.goalsOwn) return -1;
      if (a.goalsOwn < b.goalsOwn) return 1;
      return 0;
    });
  }

  static joinTablestoLeaderboard(teams: Team[], matches: Match[]): ILeaderBoard[] {
    const array = teams.map(({ id, teamName }: ITeam) =>
      this.mainTable(id, teamName, matches)) as ILeaderBoard[];
    return this.sortLeaderBoard(array);
  }

  // Main Service

  async getHomeTeamLeaderboard() {
    const allTeams = await this._teamModel.findAll();
    const allMatches = await this._matchModel.findAll({
      where: { inProgress: false },
    });
    const leaderBoard = allTeams.map(({ id, teamName }) =>
      LeaderBoardService.mainTable(
        id,
        teamName,
        LeaderBoardService.filterMatchesByHomeTeam(id, allMatches),
      )) as ILeaderBoard[];
    const sortedLeaderboard = LeaderBoardService.sortLeaderBoard(leaderBoard);
    return sortedLeaderboard;
  }
}
