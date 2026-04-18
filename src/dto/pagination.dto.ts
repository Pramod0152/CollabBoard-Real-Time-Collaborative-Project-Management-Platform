import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({ description: 'Limit of the response' })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  limit?: number;

  @ApiPropertyOptional({ description: 'Offset of the response' })
  @Transform(({ value }) => parseInt(value, 10))
  offset?: number;
}
