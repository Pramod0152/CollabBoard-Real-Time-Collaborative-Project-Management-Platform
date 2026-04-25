import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { WorkspaceService } from 'src/bll/workspace.service';
import { ResponseHandlerService } from 'src/common/response/response-handler.service';
import { GenericResponseDto } from 'src/dto/generic-response.dto';
import { CreateWorkspaceDto } from 'src/dto/workspace/create-workspace.dto';
import { UpdateWorkspaceDto } from 'src/dto/workspace/update-workspace.dto';
import { JwtAuthGuard } from 'src/strategies/guards/jwt.auth.guard';

@ApiTags('Workspace')
@Controller('workspace')
@ApiBearerAuth()
@ApiExtraModels(CreateWorkspaceDto, UpdateWorkspaceDto, GenericResponseDto)
@UseGuards(JwtAuthGuard)
export class WorkspaceController {
  constructor(
    private readonly workspaceService: WorkspaceService,
    private readonly responseHandler: ResponseHandlerService,
  ) {}

  @Post()
  async createWorkspace(@Body() item: CreateWorkspaceDto, @Req() req: any) {
    const { message } = await this.workspaceService.createWorkspace(item, req.user.id);
    return this.responseHandler.HandleResponse({}, message);
  }

  @Get()
  async getMyWorkspaces(@Request() req: any) {
    const data = await this.workspaceService.getMyWorkspaces(req.user.id);
    return this.responseHandler.HandleResponse(data);
  }

  @Get(':id')
  async getWorkspaceById(@Param('id') id: number) {
    const data = await this.workspaceService.getWorkspaceById(id);
    return this.responseHandler.HandleResponse(data);
  }

  @Put(':id')
  async updateWorkspace(@Param('id') id: number, @Body() item: UpdateWorkspaceDto, @Req() req: any) {
    const { message } = await this.workspaceService.updateWorkspace(id, item, req.user.id);
    return this.responseHandler.HandleResponse({}, message);
  }

  @Delete(':id')
  async deleteWorkspace(@Param('id') id: number, @Req() req: any) {
    const { message } = await this.workspaceService.deleteWorkspace(id, req.user.id);
    return this.responseHandler.HandleResponse({}, message);
  }
}
