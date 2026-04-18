import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Workspace } from 'src/dal/entities/workspace.entity';
import { WorkspaceDataService } from 'src/dal/workspace.data.service';
import { CreateWorkspaceDto } from 'src/dto/workspace/create-workspace.dto';
import { ReadWorkspaceDto } from 'src/dto/workspace/read-workspace.dto';

@Injectable()
export class WorkspaceService {
  constructor(
    private readonly dataService: WorkspaceDataService,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async createWorkspace(item: CreateWorkspaceDto, user_id: number) {
    const workspace = await this.dataService.createWorkspace1(item, user_id);
    return workspace;
  }

  async getMyWorkspaces(user_id: number) {
    const workspaces = await this.dataService.getMyWorkspaces(user_id);
    return await this.classMapper.mapArrayAsync(workspaces, Workspace, ReadWorkspaceDto);
  }

  async getWorkspaceById(id: number) {
    const workspace = await this.dataService.getWorkspaceById(id);
    return await this.classMapper.mapAsync(workspace, Workspace, ReadWorkspaceDto);
  }
}
