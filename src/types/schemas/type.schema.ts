import { Schema } from 'mongoose';
import * as toJSON from '@meanie/mongoose-to-json';

const TypeSchema = new Schema({
  title: String,
  icon: String,
  description: { type: String, default: '' },
  len: { type: Number, default: 0 },
});

TypeSchema.plugin(toJSON);
export { TypeSchema };
