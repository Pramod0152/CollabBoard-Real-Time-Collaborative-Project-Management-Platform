import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Workspace } from 'src/dal/entities/workspace.entity';
import { WorkspaceDataService } from 'src/dal/workspace.data.service';
import { CreateWorkspaceDto } from 'src/dto/workspace/create-workspace.dto';
import { ReadWorkspaceDto } from 'src/dto/workspace/read-workspace.dto';
import { UpdateWorkspaceDto } from 'src/dto/workspace/update-workspace.dto';

@Injectable()
export class WorkspaceService {
  constructor(
    private readonly dataService: WorkspaceDataService,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async createWorkspace(item: CreateWorkspaceDto, user_id: number) {
    await this.dataService.createWorkspace1(item, user_id);
    return {
      message: 'Workspace create successfully',
    };
  }

  async getMyWorkspaces(user_id: number) {
    const workspaces = await this.dataService.getMyWorkspaces(user_id);
    return await this.classMapper.mapArrayAsync(workspaces, Workspace, ReadWorkspaceDto);
  }

  async getWorkspaceById(id: number) {
    const workspace = await this.dataService.getWorkspaceById(id);
    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    return await this.classMapper.mapAsync(workspace, Workspace, ReadWorkspaceDto);
  }

  async updateWorkspace(id: number, item: UpdateWorkspaceDto, user_id: number) {
    const workspace = await this.dataService.updateWorkspace(id, user_id, item);
    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    return {
      message: 'Workspace updated successfully',
    };
  }

  async deleteWorkspace(id: number, user_id: number) {
    const workspace = await this.dataService.deleteWorkspace(id, user_id);
    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    return {
      message: 'Workspace deleted successfully',
    };
  }
}
