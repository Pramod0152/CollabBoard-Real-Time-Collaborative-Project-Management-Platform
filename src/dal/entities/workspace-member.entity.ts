import { AutoMap } from '@automapper/classes';
import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './user.entity';
import { Workspace } from './workspace.entity';

@Table({
  tableName: 'workspace_members',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class WorkspaceMember extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  @AutoMap()
  id: number;

  @Column
  @ForeignKey(() => Workspace)
  @AutoMap()
  workspace_id: number;

  @Column
  @ForeignKey(() => User)
  @AutoMap()
  user_id: number;

  @Column
  @AutoMap()
  role: string;

  @Column
  @AutoMap()
  status: string;

  @Column
  @ForeignKey(() => User)
  @AutoMap()
  inviter_id: number;

  @Column
  @AutoMap()
  joined_at: Date;

  @BelongsTo(() => User)
  @AutoMap(() => User)
  user: User;

  @BelongsTo(() => User)
  @AutoMap(() => User)
  inviter: User;

  @BelongsTo(() => Workspace)
  @AutoMap(() => Workspace)
  workspace: Workspace;
}
