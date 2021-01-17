import { Column, DataType, Model, Table, Unique } from 'sequelize-typescript';

@Table
export default class Player extends Model {
  @Unique
  @Column
  userId: string;

  @Column(DataType.FLOAT)
  skillLevel: number;

  @Column
  userTag: string;
}
