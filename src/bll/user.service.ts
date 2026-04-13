import { Injectable } from '@nestjs/common';
import { UserDataService } from '../dal/user-data.service';
import { Mapper } from '@automapper/core';
import { ReadUserDto } from 'src/dto/user/read-user.dto';
import { User } from 'src/dal/entities/user.entity';
import { InjectMapper } from '@automapper/nestjs';

@Injectable()
export class UserService {
  constructor(
    private readonly userData: UserDataService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async findAllUsers() {
    const users = await this.userData.findAllUsers();
    return this.mapper.mapArrayAsync(users, User, ReadUserDto);
  }

  async findUserById(id: string) {
    const user = await this.userData.findUserById(id);
    return this.mapper.map(user, User, ReadUserDto);
  }
}
