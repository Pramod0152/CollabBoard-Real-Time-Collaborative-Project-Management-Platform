import { AutoMap } from '@automapper/classes';

export class ReadUserDto {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  email: string;

  @AutoMap()
  created_at: Date;
}
