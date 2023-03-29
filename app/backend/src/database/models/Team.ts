import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class Team extends Model {
  id!: number;
  teamName!: string;
}
Team.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    teamName: {
      allowNull: false,
      type: STRING,
      field: 'team_name',
    },
  },
  {
    modelName: 'teams',
    underscored: true,
    sequelize: db,
    timestamps: false,
  },
);

export default Team;
