import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import Team from '../../db/models/Team.model';
import Match from '../../db/models/Match.model';

@Table
export default class TeamMatch extends Model {
  @ForeignKey(() => Team)
  @Column
  teamId: number;

  @ForeignKey(() => Match)
  @Column
  matchId: number;
}
