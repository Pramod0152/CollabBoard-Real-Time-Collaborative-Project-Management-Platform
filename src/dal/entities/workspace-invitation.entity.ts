import { BelongsTo, Column, ForeignKey, Model, Table, Unique } from 'sequelize-typescript';
import { AutoMap } from '@automapper/classes';
import { Workspace } from './workspace.entity';
import { User } from './user.entity';

@Table({
  tableName: 'workspace_invitations',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class WorkspaceInvitation extends Model {
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
  inviter_id: number;

  @Column
  @ForeignKey(() => User)
  @AutoMap()
  user_id: number;

  @Column
  @AutoMap()
  email: string;

  @Column
  @AutoMap()
  @Unique
  token: string;

  @Column
  role: string;

  @Column
  @AutoMap()
  is_accepted: boolean;

  @Column
  @AutoMap()
  expires_at: Date;

  @BelongsTo(() => Workspace)
  @AutoMap(() => Workspace)
  workspace: Workspace;

  @BelongsTo(() => User)
  @AutoMap(() => User)
  inviter: User;

  @BelongsTo(() => User)
  @AutoMap(() => User)
  user: User;
}
