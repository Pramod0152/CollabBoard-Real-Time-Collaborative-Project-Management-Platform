import { Body, Controller, Get, Param, Post, Req, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { WorkspaceService } from 'src/bll/workspace.service';
import { ResponseHandlerService } from 'src/common/response/response-handler.service';
import { GenericResponseDto } from 'src/dto/generic-response.dto';
import { PaginationDto } from 'src/dto/pagination.dto';
import { CreateWorkspaceDto } from 'src/dto/workspace/create-workspace.dto';
import { JwtAuthGuard } from 'src/strategies/guards/jwt.auth.guard';

@ApiTags('Workspace')
@Controller('workspace')
@ApiBearerAuth()
@ApiExtraModels(CreateWorkspaceDto, GenericResponseDto)
@UseGuards(JwtAuthGuard)
export class WorkspaceController {
  constructor(
    private readonly workspaceService: WorkspaceService,
    private readonly responseHandler: ResponseHandlerService,
  ) {}

  @Post()
  async createWorkspace(@Body() item: CreateWorkspaceDto, @Req() req: any) {
    const workspace = await this.workspaceService.createWorkspace(item, req.user.id);
    return this.responseHandler.HandleResponse(workspace, 'Workspace created successfully');
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
}
