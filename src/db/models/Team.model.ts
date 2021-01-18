import { Column, Model, Table, ForeignKey, HasMany, BelongsToMany } from 'sequelize-typescript';
import PlayerH from '../../db/models/PlayerH.model';
import Match from '../../db/models/Match.model';
import TeamMatch from '../../db/models/TeamMatchModel';

@Table
export default class Team extends Model {
  @Column
  teamName: string;

  @ForeignKey(() => PlayerH)
  @Column
  p1: number;

  @ForeignKey(() => PlayerH)
  @Column
  p2: number;

  @ForeignKey(() => PlayerH)
  @Column
  p3: number;

  @ForeignKey(() => PlayerH)
  @Column
  p4: number;

  @ForeignKey(() => PlayerH)
  @Column
  p5: number;

  @BelongsToMany(() => Match, () => TeamMatch)
  matches: Match[];

  @HasMany(() => PlayerH)
  players: PlayerH[];
}
