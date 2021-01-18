import { Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany, HasOne } from 'sequelize-typescript';
import Player from './Player.model';
import Team from './Team.model';

@Table
export default class PlayerH extends Model {
  @ForeignKey(() => Player)
  @Column
  playerId: number;

  @BelongsTo(() => Player)
  player: Player;

  @Column(DataType.FLOAT)
  skillLevel: number;

  @HasMany(() => Team, 'playerId1')
  team1: Team;

  @HasMany(() => Team, 'playerId2')
  team2: Team;

  @HasMany(() => Team, 'playerId3')
  team3: Team;

  @HasMany(() => Team, 'playerId4')
  team4: Team;

  @HasMany(() => Team, 'playerId5')
  team5: Team;
}
