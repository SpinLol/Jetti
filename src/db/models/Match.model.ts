import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Team from '../../db/models/Team.model';

@Table({ tableName: 'Match' })
export default class Match extends Model {
  @Column({ defaultValue: 0 })
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

  getOutcome(): string {
    if (this.matchResult == 1) {
      return 'Team 1 won';
    } else if (this.matchResult == 2) {
      return 'Team 2 won';
    }

    return 'Draw';
  }
}
