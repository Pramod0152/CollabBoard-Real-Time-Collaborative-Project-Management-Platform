import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateWorkspaceDto } from './create-workspace.dto';

export class UpdateWorkspaceDto extends PartialType(
  OmitType(CreateWorkspaceDto, ['user_id'] as const),
) {}
