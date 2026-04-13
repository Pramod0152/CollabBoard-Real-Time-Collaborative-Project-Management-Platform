import { MetaDto } from './meta.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GenericResponseDto<T> {
  @ApiProperty()
  message?: string;

  @ApiProperty()
  meta?: MetaDto;

  @ApiProperty()
  data?: T;
}
