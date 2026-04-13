import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { GenericResponseDto } from 'src/dto/generic-response.dto';
import { MetaDto } from 'src/dto/meta.dto';
import { LoggerService } from 'src/common/logger/logger';

@Catch()
export class ExceptionFilterService implements ExceptionFilter {
  constructor(
    private readonly configService: ConfigService,
    private logger: LoggerService,
  ) {}

  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    if (exception.name === 'ServiceUnavailableException') {
      const statusCode = this.getStatusCode(exception);
      return response.status(statusCode).json(exception);
    }

    const res: GenericResponseDto<any> = { message: '', data: {}, meta: new MetaDto({}) };
    res.message = exception.message || 'Something went wrong, please try again later!';
    res.meta.path = request.url || '';
    res.meta.method = request.method || '';
    res.meta.timestamp = new Date();
    res.meta.httpStatusCode = this.getStatusCode(exception);
    res.meta.code = 'GENERAL_EXCEPTION';
    res.meta.severity = '3';
    res.meta.stack = exception.stack || '';

    if (exception instanceof HttpException) {
      const excep = exception.getResponse() as Record<string, any>;

      // ValidationPipe returns message as an array — join it into readable string
      if (Array.isArray(excep.message)) {
        res.message = excep.message.join(', ');
      } else {
        res.message = excep.message || exception.message;
      }

      res.meta.code = excep.code || 'GENERAL_EXCEPTION';
      res.meta.severity = excep.severity || '3';
    }

    const env = this.configService.get<string>('NODE_ENV');
    if (env === 'production') {
      delete res.meta.path;
      delete res.meta.method;
      delete res.meta.timestamp;
      delete res.meta.severity;
      delete res.meta.stack;

      if (res.meta.httpStatusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
        res.message = 'Internal Server Error';
      }
    }

    /** Log the error with application_id*/
    const errorLog = this.getErrorLog(res);
    this.logger.error(`👿👿 👿👿 ${errorLog}`);

    return response.status(res.meta.httpStatusCode).json(res);
  }

  private getStatusCode(exception: unknown): number {
    return exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getErrorLog(errorResponse: GenericResponseDto<any>): string {
    const message: string = errorResponse.message;
    const { httpStatusCode, method, path, stack } = errorResponse.meta;

    const errorLog = ` : 🔥 🔥  ${errorResponse.message}  🔥 🔥 \n 
            RESPONSE CODE: ${httpStatusCode}  METHOD: ${method}   URL: ${path} \n
            Stack: ${stack ? stack : message}
        `;
    return errorLog;
  }
}
