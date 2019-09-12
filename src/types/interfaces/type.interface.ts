import { Document } from 'mongoose';

export interface Type extends Document {
  readonly title: string;
  readonly description: string;
}
