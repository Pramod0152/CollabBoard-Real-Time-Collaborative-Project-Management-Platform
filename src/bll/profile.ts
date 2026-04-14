import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from 'src/dal/entities/user.entity';
import { Workspace } from 'src/dal/entities/workspace.entity';
import { ReadMyUserDto } from 'src/dto/user/read-my-user.dto';
import { ReadUserDto } from 'src/dto/user/read-user.dto';
import { ReadWorkspaceDto } from 'src/dto/workspace/read-workspace.dto';

@Injectable()
export class Profile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, User, ReadUserDto);
      createMap(mapper, User, ReadMyUserDto);
      createMap(mapper, Workspace, ReadWorkspaceDto);
    };
  }
}
