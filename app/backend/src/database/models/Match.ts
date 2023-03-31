import { Model, INTEGER } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  id!: number;
  homeTeamId!: number;
  homeTeamGoals!: number;
  awayTeamId!: number;
  awayTeamGoals!: number;
  inProgress!: number;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeamId: {
    allowNull: false,
    field: 'home_team_id',
    type: INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  homeTeamGoals: {
    allowNull: false,
    field: 'home_team_goals',
    type: INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  awayTeamId: {
    allowNull: false,
    field: 'away_team_id',
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    field: 'away_team_goals',
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    defaultValue: 0,
    field: 'in_progress',
    type: INTEGER,
  },
}, {
  modelName: 'matches',
  sequelize: db,
  timestamps: false,
  underscored: true,
});

Match.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Match.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Match;
