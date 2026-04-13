import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ExceptionFilterService } from './services/exception-filter.service';
import { ConfigService } from '@nestjs/config';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.GLOBAL_PREFIX ?? '/api/v1');

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
