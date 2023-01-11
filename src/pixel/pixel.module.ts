import { Module } from '@nestjs/common';
import { PixelService } from './pixel.service';
import { PixelController } from './pixel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pixel, PixelSchema } from './model/pixel.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pixel.name, schema: PixelSchema }]),
  ],
  controllers: [PixelController],
  providers: [PixelService],
  exports: [PixelService],
})
export class PixelModule {}
