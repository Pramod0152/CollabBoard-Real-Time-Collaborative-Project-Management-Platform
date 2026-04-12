import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UserDataService } from './user-data.service';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserDataService],
  exports: [SequelizeModule, UserDataService],
})
export class DalModule {}
