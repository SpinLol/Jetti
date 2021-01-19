import { Column, Model, Table, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
import PlayerH from '../../db/models/PlayerH.model';
import Match from '../../db/models/Match.model';

@Table({ tableName: 'Team' })
export default class Team extends Model {
  @Column
  teamName: string;

  @ForeignKey(() => PlayerH)
  @Column
  playerId1: number;

  @BelongsTo(() => PlayerH, 'playerId1')
  player1: PlayerH;

  @ForeignKey(() => PlayerH)
  @Column
  playerId2: number;

  @BelongsTo(() => PlayerH, 'playerId2')
  player2: PlayerH;

  @ForeignKey(() => PlayerH)
  @Column
  playerId3: number;

  @BelongsTo(() => PlayerH, 'playerId3')
  player3: PlayerH;

  @ForeignKey(() => PlayerH)
  @Column
  playerId4: number;

  @BelongsTo(() => PlayerH, 'playerId4')
  player4: PlayerH;

  @ForeignKey(() => PlayerH)
  @Column
  playerId5: number;

  @BelongsTo(() => PlayerH, 'playerId5')
  player5: PlayerH;

  @HasMany(() => Match, 'teamId1')
  match1: Match[];

  @HasMany(() => Match, 'teamId2')
  match2: Match[];
}
