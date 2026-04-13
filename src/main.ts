import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, RequestMethod, ValidationPipe } from '@nestjs/common';
import { ExceptionFilterService } from './services/exception-filter.service';
import { ConfigService } from '@nestjs/config';
import { ValidationError } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = (process.env.GLOBAL_PREFIX ?? 'api/v1').replace(/^\/+|\/+$/g, '');

  const config = new DocumentBuilder().setTitle('Collab Board API').setDescription('Collab Board API description').setVersion('1.0').addBearerAuth().build();
  app.setGlobalPrefix(globalPrefix, {
    exclude: [
      { path: 'robots.txt', method: RequestMethod.GET },
      { path: 'file/access', method: RequestMethod.GET },
    ],
  });
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  /** Config validation pipes for class validation.*/
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const formatErrors = (errs: ValidationError[]) => {
          const messages = [];
          for (const error of errs) {
            if (error.constraints) {
              messages.push(...Object.values(error.constraints));
            }
            if (error.children && error.children.length) {
              messages.push(...formatErrors(error.children));
            }
          }
          return messages;
        };
        const errorMessage = formatErrors(errors).join(', ');
        return new BadRequestException({
          message: errorMessage,
        });
      },
    }),
  );

  app.enableCors({
    origin: '*',
  });

  app.useGlobalFilters(new ExceptionFilterService(app.get(ConfigService)));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
