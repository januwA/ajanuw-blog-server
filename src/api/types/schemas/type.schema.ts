import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TypeDocument = Type & mongoose.Document;

@Schema()
export class Type {
  @Prop()
  title: string;

  @Prop()
  icon: string;

  @Prop({ type: String, default: '' })
  description: string;

  @Prop({ type: Number, default: 0 })
  len: number;
}

export const TypeSchema = SchemaFactory.createForClass(Type);
