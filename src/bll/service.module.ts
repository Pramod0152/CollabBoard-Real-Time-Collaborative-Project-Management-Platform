import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { Profile } from './profile';
import { WorkspaceService } from './workspace.service';

@Global()
@Module({
  imports: [JwtModule],
  providers: [UserService, Profile, WorkspaceService],
  exports: [UserService, Profile, WorkspaceService],
})
export class ServiceModule {}
