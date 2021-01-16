import { Column, Model, Table, Unique } from 'sequelize-typescript';

@Table
export default class Player extends Model {
  @Unique
  @Column
  userId: string;

  @Column
  skillLevel: number;

  @Column
  userTag: string;
}
