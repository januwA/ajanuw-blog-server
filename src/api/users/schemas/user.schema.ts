import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;
@Schema()
export class User {

  @Prop({ type: String })
  username: string;
  
  @Prop({ type: String })
  password: string;
  
}
export const UserSchema = SchemaFactory.createForClass(User);