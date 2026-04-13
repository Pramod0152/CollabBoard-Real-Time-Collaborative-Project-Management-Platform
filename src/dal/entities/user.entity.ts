import { AutoMap } from '@automapper/classes';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' })
export class User extends Model {
  @AutoMap()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @AutoMap()
  @Column
  name: string;

  @AutoMap()
  @Column
  email: string;

  @AutoMap()
  @Column
  password: string;

  @AutoMap()
  @Column
  created_at: Date;

  @AutoMap()
  @Column
  updated_at: Date;
}
