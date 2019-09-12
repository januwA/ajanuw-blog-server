import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DatabaseNames } from '~src/databases-names';
import { Model, Types } from 'mongoose';
import { Essay } from './interfaces/essay.interface';
import { UpdateEssayDto } from './dto/update-essay.dto';
import { CreateEssayDto } from './dto/create-essay.dto';
import { RemoveEssayDto } from './dto/patch-sesay.dto';

@Injectable()
export class EssaysService {
  private readonly _findLimit = 15;
  private _gSkip(page: number): number {
    return (page - 1) * this._findLimit;
  }

  constructor(
    @InjectModel(DatabaseNames.essays)
    private readonly essayModel: Model<Essay>,
  ) {}

  async create(createEssayDto: CreateEssayDto): Promise<Essay> {
    try {
      const createdType = new this.essayModel(createEssayDto);
      const newDoc = await createdType.save();
      const data: Essay[] = await this.essayModel
        .aggregate()
        .match({ _id: newDoc._id })
        .lookup(this._typesLookup);
      if (data.length === 0) throw new NotFoundException();
      const essay = data[0];
      return new this.essayModel(essay);
    } catch (error) {
      throw new InternalServerErrorException('创建失败');
    }
  }

  async update(putEssayDto: UpdateEssayDto): Promise<any> {
    try {
      const { id, ...update } = putEssayDto;
      await this.essayModel.updateOne(
        { _id: id },
        {
          $set: update,
          $currentDate: { lastModified: true },
        },
      );
      return;
    } catch (er) {
      throw new InternalServerErrorException('更新失败');
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const _id = Types.ObjectId(id);
      await this.essayModel.deleteOne({ _id });
      return;
    } catch (error) {
      throw new InternalServerErrorException('删除失败');
    }
  }

  async patch(id: string, removeEssayDto: RemoveEssayDto): Promise<any> {
    for (const el of removeEssayDto.patchs) {
      let { op, path, value } = el;

      // 其它op选项未实施
      if (op !== 'replace') throw new NotImplementedException();

      const mongoPath = this._getMongoPath(path);
      try {
        const _id = Types.ObjectId(id);
        await this.essayModel.updateOne(
          { _id },
          {
            $set: { [mongoPath]: value },
          },
        );
        return;
      } catch (error) {
        throw new InternalServerErrorException();
      }
    }
  }

  async findOne(id: string): Promise<Essay> {
    const _id = Types.ObjectId(id);

    try {
      const data: Essay[] = await this.essayModel
        .aggregate()
        .match({ _id })
        .lookup(this._typesLookup)
        .project({ summary: 0 }); // 详情不显示摘要
      if (data.length === 0) throw new NotFoundException();
      const essay = data[0];
      return new this.essayModel(essay);
    } catch (er) {
      throw new NotFoundException();
    }
  }

  private async findAll(match: any, page: number): Promise<Essay[]> {
    try {
      const allData: Essay[] = await this.essayModel
        .aggregate()
        .match(match)
        .lookup(this._typesLookup)
        .project({ content: 0 }) // 列表不显示内容，只显示摘要
        .skip(this._gSkip(page)) // 先skip，在limit
        .limit(this._findLimit);

      return allData.map(e => new this.essayModel(e));
    } catch (error) {
      throw new NotFoundException();
    }
  }

  /**
   * 所有未删除的essay
   */
  async findNotDeleteEssays(page: number): Promise<Essay[]> {
    return await this.findAll({ isDelete: false }, page);
  }

  async searchTitle(word: string, page: number): Promise<Essay[]> {
    const result = await this.essayModel
      .find(
        {
          /// 一个word查询，对中文有点不合理
          // $text: {
          //   $search: word,
          //   $language: ''
          //  },

          isDelete: false,
          // 使用正则表达式查询
          title: {
            $regex: new RegExp(word, 'i'),
          },
        },
        {
          content: 0,
        },
      )
      .skip(this._gSkip(page))
      .limit(this._findLimit);
    return result;
  }

  /**
   * 所有删除了的essay
   */
  async findDeleteEssays(page: number): Promise<Essay[]> {
    return await this.findAll({ isDelete: true }, page);
  }

  /**
   * 使用type ids连表查询
   */
  private _typesLookup = {
    from: DatabaseNames.types,
    localField: 'types',
    foreignField: '_id',
    as: 'ts',
  };

  private _getMongoPath(path: string) {
    return path.replace(/^\//, '').replace(/\//g, '.');
  }
}
