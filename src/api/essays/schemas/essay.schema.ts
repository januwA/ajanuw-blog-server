import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Type } from '~api/types/schemas/type.schema';

export type EssayDocument = Essay & mongoose.Document;

@Schema()
export class Essay {
  @Prop({ type: String, indexes: 'text' })
  title: string;

  @Prop({ type: String })
  content: string;

  @Prop({ type: String })
  summary: string;

  @Prop({ type: Date, default: Date.now })
  published: Date;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Type' }],
  })
  types: Type;

  @Prop({ type: Boolean, default: false })
  isDelete: boolean;
}
export const EssaySchema = SchemaFactory.createForClass(Essay);
