import { Injectable } from '@nestjs/common';
import { Workspace } from './entities/workspace.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateWorkspaceDto } from 'src/dto/workspace/create-workspace.dto';
import { User } from './entities/user.entity';
import { UpdateWorkspaceDto } from 'src/dto/workspace/update-workspace.dto';

@Injectable()
export class WorkspaceDataService {
  constructor(@InjectModel(Workspace) private readonly model: typeof Workspace) {}

  async createWorkspace1(item: CreateWorkspaceDto, user_id: number) {
    return this.model.create({
      user_id: user_id,
      name: item.name,
      slug: item.slug,
      description: item.description,
      plan: item.plan,
    });
  }

  async getMyWorkspaces(user_id: number) {
    return this.model.findAll({
      where: {
        user_id: user_id,
        deleted_at: null,
      },
      include: ['user'],
    });
  }

  async getWorkspaceById(id: number) {
    return this.model.findOne({
      where: {
        id,
        deleted_at: null,
      },
      include: [User],
    });
  }

  async updateWorkspace(id: number, user_id: number, item: UpdateWorkspaceDto) {
    const workspace = await this.model.findOne({
      where: {
        id,
        user_id,
        deleted_at: null,
      },
    });

    if (!workspace) {
      return null;
    }

    const updateData: Partial<Pick<Workspace, 'name' | 'slug' | 'description' | 'plan'>> = {};

    if (item.name !== undefined) updateData.name = item.name;
    if (item.slug !== undefined) updateData.slug = item.slug;
    if (item.description !== undefined) updateData.description = item.description;
    if (item.plan !== undefined) updateData.plan = item.plan;

    return workspace.update(updateData);
  }

  async deleteWorkspace(id: number, user_id: number) {
    const workspace = await this.model.findOne({
      where: {
        id,
        user_id,
        deleted_at: null,
      },
    });

    if (!workspace) {
      return null;
    }

    return workspace.update({
      deleted_at: new Date(),
    });
  }
}
