import { Column, Model, Table, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import Team from '../../db/models/Team.model';

@Table
export default class Match extends Model {
  @Column
  matchResult: number; //0 = draw, 1 = t1 won, 2 = t2 won

  @Column
  screenshotPath: string;

  @ForeignKey(() => Team)
  @Column
  teamId1: number;

  @BelongsTo(() => Team, 'teamId1')
  team1: Team;

  @ForeignKey(() => Team)
  @Column
  teamId2: number;

  @BelongsTo(() => Team, 'teamId2')
  team2: Team;
}
