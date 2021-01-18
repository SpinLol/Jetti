import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import PlayerH from '../../db/models/PlayerH.model';
import Team from '../../db/models/Team.model';

@Table
export default class PlayerHTeam extends Model {
  @ForeignKey(() => Team)
  @Column
  teamId: number;

  @ForeignKey(() => PlayerH)
  @Column
  playerHId: number;
}
