import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './gateway/app.gateway';
import { PixelModule } from './pixel/pixel.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRESQL_ADDON_HOST,
      port: parseInt(process.env.POSTGRESQL_ADDON_PORT),
      username: process.env.POSTGRESQL_ADDON_USER,
      password: process.env.POSTGRESQL_ADDON_PASSWORD,
      database: process.env.POSTGRESQL_ADDON_DB,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    PixelModule,
    AuthModule,
    UserModule,
    TeamModule
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
