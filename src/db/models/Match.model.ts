import { Column, HasOne, Model, Table, Unique, ForeignKey } from 'sequelize-typescript';
import Team from '../../db/models/Team.model';

@Table
export default class Match extends Model {
  @Unique
  @Column
  matchDate: string;

  @Column
  matchTime: string;

  @Column
  matchResult: number; //0 = draw, 1 = t1 won, 2 = t2 won

  @Column
  screenshotPath: string;

  @ForeignKey(() => Team)
  @Column
  t1_id: number;

  @HasOne(() => Team, 't1_id')
  t1: Team;

  @ForeignKey(() => Team)
  @Column
  t2_id: number;

  @HasOne(() => Team, 't2_id')
  t2: Team;
}
