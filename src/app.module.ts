import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DalModule } from './dal/dal.module';
import { ServiceModule } from './bll/service.module';
import { UserModule } from './modules/user/user.module';
import { SequelizeConfigService } from './services/sequelize-config.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

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
    DalModule,
    ServiceModule,
    UserModule,
    JwtModule.register({}),
  ],
  controllers: [],
  providers: [JwtStrategy],
  exports: [JwtModule, JwtStrategy],
})
export class AppModule {}
