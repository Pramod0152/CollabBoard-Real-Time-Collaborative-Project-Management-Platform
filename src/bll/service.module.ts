import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { Profile } from './profile';

@Global()
@Module({
  imports: [JwtModule],
  providers: [UserService, Profile],
  exports: [UserService, Profile],
})
export class ServiceModule {}
