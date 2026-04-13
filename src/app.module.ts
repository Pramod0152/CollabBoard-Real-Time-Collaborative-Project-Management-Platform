import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DalModule } from './dal/dal.module';
import { ServiceModule } from './bll/service.module';
import { SequelizeConfigService } from './services/sequelize-config.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ResponseModule } from './common/response/response.module';
import { FrontendModule } from './modules/frontend/frontend.module';
import { LoggerModule } from './common/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    PassportModule,
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ResponseModule,
    LoggerModule,
    DalModule,
    ServiceModule,
    FrontendModule,
    JwtModule.register({}),
  ],
  controllers: [],
  providers: [JwtStrategy],
  exports: [JwtModule, JwtStrategy],
})
export class AppModule {}
