import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { WorkspaceModule } from './workspace/workspace.module';

@Module({
  imports: [UserModule, JwtModule, WorkspaceModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class FrontendModule {}
