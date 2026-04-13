import { MetaDto } from './meta.dto';

export class GenericResponseDto<T = any> {
  message?: string;
  meta?: MetaDto;
  data?: T;
}
