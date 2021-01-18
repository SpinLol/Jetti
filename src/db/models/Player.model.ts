import { Column, DataType, Model, Table, Unique, HasMany } from 'sequelize-typescript';
import PlayerH from '../../db/models/PlayerH.model';

@Table
export default class Player extends Model {
  @Unique
  @Column
  userId: string;

  @Column(DataType.FLOAT)
  skillLevel: number;

  @Column
  userTag: string;

  @HasMany(() => PlayerH)
  history: PlayerH[];
}
