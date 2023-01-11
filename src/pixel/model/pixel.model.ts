import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PixelDocument = Pixel & Document;

@Schema()
export class Pixel {
  @Prop({ Type: Number })
  x: number;

  @Prop({ Type: Number })
  y: number;

  @Prop({ type: String })
  color: string;
}

export const PixelSchema = SchemaFactory.createForClass(Pixel);
