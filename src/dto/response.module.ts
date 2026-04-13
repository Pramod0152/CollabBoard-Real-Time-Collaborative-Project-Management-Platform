import { Global, Module } from '@nestjs/common';
import { ResponseHandlerService } from 'src/common/response/response-handler.service';

@Global()
@Module({
  providers: [ResponseHandlerService],
  exports: [ResponseHandlerService],
})
export class ResponseModule {}
