import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GenericResponseDto } from 'src/dto/generic-response.dto';

@Injectable()
export class ResponseHandlerService {
  constructor(private readonly configService: ConfigService) {}

  public async HandleResponse(data: any, message?: string): Promise<GenericResponseDto<any>> {
    const result: GenericResponseDto<any> = {
      message: message || 'Success',
      data: data || {},
      meta: null,
    };

    return result;
  }
}
