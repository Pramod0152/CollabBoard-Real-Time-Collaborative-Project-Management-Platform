import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ReadUserDto } from '../user/read-user.dto';

export class ReadWorkspaceDto {
  @ApiProperty()
  @AutoMap()
  id: number;

  @ApiProperty()
  @AutoMap()
  user_id: number;

  @ApiProperty()
  @AutoMap()
  name: string;

  @ApiProperty()
  @AutoMap()
  slug: string;

  @ApiProperty()
  @AutoMap()
  description: string;

  @ApiProperty()
  @AutoMap()
  plan: string;

  @ApiProperty()
  @AutoMap()
  created_at: Date;

  @ApiProperty()
  @AutoMap()
  updated_at: Date;

  @ApiProperty()
  @AutoMap()
  deleted_at: Date;

  @ApiProperty({ type: ReadUserDto })
  @AutoMap(() => ReadUserDto)
  user: ReadUserDto;
}
