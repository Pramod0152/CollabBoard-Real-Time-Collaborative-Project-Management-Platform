import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { RegisterDto } from 'src/dto/user/register.dto';

@Injectable()
export class UserDataService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  async create(data: RegisterDto) {
    return this.userModel.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  }

  async findAllUsers() {
    return this.userModel.findAll();
  }

  async findUserById(id: string) {
    return this.userModel.findByPk(id);
  }
}
