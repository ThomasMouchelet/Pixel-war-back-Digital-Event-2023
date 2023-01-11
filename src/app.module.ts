import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './gateway/app.gateway';
import { ConfigModule } from '@nestjs/config';
import { PixelModule } from './pixel/pixel.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_ADDON_URI),
    PixelModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
