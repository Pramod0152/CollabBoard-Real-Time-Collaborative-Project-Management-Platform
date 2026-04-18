import { Injectable } from '@nestjs/common';
import { Workspace } from './entities/workspace.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateWorkspaceDto } from 'src/dto/workspace/create-workspace.dto';
import { User } from './entities/user.entity';

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
      },
      include: ['user'],
    });
  }

  async getWorkspaceById(id: number) {
    return this.model.findOne({
      where: {
        id,
      },
      include: [User],
    });
  }
}
