import { Column, DataType, Model, Table, ForeignKey, PrimaryKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import PlayerHTeam from '../../db/models/PlayerHTeam';
import Player from '../../db/models/Player.model';
import Team from '../../db/models/Team.model';

@Table
export default class PlayerH extends Model {
  //   @PrimaryKey
  @ForeignKey(() => Player)
  @Column
  playerId: number;

  @BelongsTo(() => Player, 'playerId')
  player: Player;

  @Column(DataType.FLOAT)
  skillLevel: number;

  @Column
  historyDate: string;

  @BelongsToMany(() => Team, () => PlayerHTeam) //brauch ich wirklich eine PlayerHTeam Tabelle, oder jedes match ein neuen PlayerH erstellen?
  teams: Team[];
}
