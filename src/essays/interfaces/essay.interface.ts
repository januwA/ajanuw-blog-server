import { Document } from 'mongoose';

export interface Essay extends Document {
  //  标题
  readonly title: string;

  // 内容
  readonly content: string;
  readonly summary: string;

  // 发布时间
  readonly published: Date;

  // 文章的分类
  readonly types: string[];
  readonly isDelete: boolean;
}
