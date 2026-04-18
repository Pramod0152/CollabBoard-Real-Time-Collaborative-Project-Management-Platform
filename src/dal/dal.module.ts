import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UserDataService } from './user-data.service';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceDataService } from './workspace.data.service';
import { WorkspaceMember } from './entities/workspace-member.entity';
import { WorkspaceInvitation } from './entities/workspace-invitation.entity';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([User, Workspace, WorkspaceMember, WorkspaceInvitation])],
  providers: [UserDataService, WorkspaceDataService],
  exports: [SequelizeModule, UserDataService, WorkspaceDataService],
})
export class DalModule {}
