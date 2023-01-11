import { Module } from '@nestjs/common';
import { PixelService } from './pixel.service';
import { PixelController } from './pixel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PixelEntity } from './entities/pixel.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PixelEntity]),
    UserModule
  ],
  controllers: [PixelController],
  providers: [PixelService],
  exports: [PixelService],
})
export class PixelModule {}
