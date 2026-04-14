import { AutoMap } from '@automapper/classes';
import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './user.entity';

@Table({
  tableName: 'workspaces',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Workspace extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  @AutoMap()
  id: number;

  @Column
  @ForeignKey(() => User)
  @AutoMap()
  user_id: number;

  @Column
  @AutoMap()
  name: string;

  @Column
  @AutoMap()
  slug: string;

  @Column
  @AutoMap()
  description: string;

  @Column
  @AutoMap()
  plan: string;

  @Column
  @AutoMap()
  created_at: Date;

  @Column
  @AutoMap()
  updated_at: Date;

  @Column
  @AutoMap()
  deleted_at: Date;

  @BelongsTo(() => User)
  @AutoMap(() => User)
  user: User;
}
