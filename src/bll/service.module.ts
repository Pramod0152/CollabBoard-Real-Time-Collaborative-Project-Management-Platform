import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [JwtModule],
  providers: [UserService],
  exports: [UserService],
})
export class ServiceModule {}
