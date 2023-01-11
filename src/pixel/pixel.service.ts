import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePixelDto } from './dto/create-pixel.dto';
import { UpdatePixelDto } from './dto/update-pixel.dto';
import { Pixel, PixelDocument } from './model/pixel.model';

@Injectable()
export class PixelService {
  constructor(
    @InjectModel(Pixel.name) private pixelModel: Model<PixelDocument>,
  ) {}

  async create(createPixelDto: CreatePixelDto) {
    console.log('PixelService create', createPixelDto);
    const pixel = await new this.pixelModel(createPixelDto);
    return await pixel.save();
  }

  async findAll() {
    const pixels = await this.pixelModel.find();
    return pixels;
  }

  findOne(id: number) {
    return `This action returns a #${id} pixel`;
  }

  update(id: number, updatePixelDto: UpdatePixelDto) {
    return `This action updates a #${id} pixel`;
  }

  remove(id: number) {
    return `This action removes a #${id} pixel`;
  }
}
