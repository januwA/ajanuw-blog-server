import { Schema, Types } from 'mongoose';
import * as toJSON from '@meanie/mongoose-to-json';
import { TypeSchema } from '~src/types/schemas/type.schema';

const EssaySchema = new Schema({
  //  标题
  title: { type: String, index: 'text' },

  // 内容
  content: String,
  summary: String,

  // 发布时间
  published: { type: Date, default: Date.now },

  // 文章的分类id
  types: [Types.ObjectId],
  ts: { type: [TypeSchema] },

  /// 假删除
  isDelete: { type: Boolean, default: false },
});

EssaySchema.plugin(toJSON);
export { EssaySchema };
