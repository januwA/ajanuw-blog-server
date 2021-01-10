import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateEssayDto } from './dto/update-essay.dto';
import { CreateEssayDto } from './dto/create-essay.dto';
import { RemoveEssayDto } from './dto/patch-sesay.dto';
import { Essay, EssayDocument } from './schemas/essay.schema';

@Injectable()
export class EssaysService {
  // 分页，每页15条数据
  private readonly _findLimit = 15;

  private _gSkip(page: number): number {
    return (page - 1) * this._findLimit;
  }

  constructor(
    @InjectModel(Essay.name)
    private readonly essayModel: Model<EssayDocument>,
  ) {}

  async create(createEssayDto: CreateEssayDto) {
    try {
      const createdType = new this.essayModel(createEssayDto);
      return (await createdType.save()).populate('types');
    } catch (error) {
      throw new InternalServerErrorException('创建失败');
    }
  }

  async update(putEssayDto: UpdateEssayDto) {
    try {
      const { id, ...update } = putEssayDto;
      return await this.essayModel.updateOne(
        { _id: id },
        {
          $set: new this.essayModel(update),
          $currentDate: { lastModified: true },
        },
      );
    } catch (er) {
      throw new InternalServerErrorException('更新失败');
    }
  }

  async delete(id: string): Promise<any> {
    try {
      return this.essayModel.deleteOne({ _id: Types.ObjectId(id) });
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
        return this.essayModel.updateOne(
          { _id: Types.ObjectId(id) },
          {
            $set: { [mongoPath]: value },
          },
        );
      } catch (error) {
        throw new InternalServerErrorException();
      }
    }
  }

  async findOne(id: string): Promise<Essay> {
    try {
      return this.essayModel.findById(id).populate('types');
    } catch (er) {
      throw new NotFoundException();
    }
  }

  private async findAll(match: any, page: number): Promise<EssayDocument[]> {
    return this.essayModel
      .find(match)
      .populate('types')
      .skip(this._gSkip(page)) // 先skip，在limit
      .limit(this._findLimit);
  }

  /**
   * 所有未删除的essay
   */
  async findNotDeleteEssays(page: number): Promise<Essay[]> {
    return await this.findAll({ isDelete: false }, page);
  }

  async searchTitle(word: string, page: number): Promise<EssayDocument[]> {
    return this.essayModel
      .find({
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
      })
      .skip(this._gSkip(page))
      .limit(this._findLimit)
      .populate('types');
  }

  /**
   * 所有假删除了的essay
   */
  async findDeleteEssays(page: number): Promise<Essay[]> {
    return await this.findAll({ isDelete: true }, page);
  }

  /**
   * * 查询指定类型的essays，没有分页一次拉完
   * @param typeId
   */
  async findCategoryEssays(typeId: string) {
    return this.essayModel.find({
      isDelete: false,
      types: typeId as any,
    });
  }

  /**
   * 使用type ids连表查询
   */
  private _typesLookup = {
    from: 'types',
    localField: 'types',
    foreignField: '_id',
    as: 'ts',
  };

  private _getMongoPath(path: string) {
    return path.replace(/^\//, '').replace(/\//g, '.');
  }
}
