import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Type } from './interfaces/type.interface';
import { CreateTypeDto } from './dto/create-type.dto';
import { PutTypeDto } from './dto/put-type.dto';
import { DatabaseNames } from '~src/databases-names';
import { TypeClass } from './classes/type.class';

@Injectable()
export class TypesService {
  constructor(
    @InjectModel(DatabaseNames.types) private readonly typeModel: Model<Type>,
  ) {}

  /**
   * 增加一个文章类型
   * @param createTypeDto
   */
  async create(createTypeDto: CreateTypeDto): Promise<Type> {
    try {
      const createdType = new this.typeModel(createTypeDto);
      return await createdType.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  /**
   * 删除指定id的type
   * @param typeId
   */
  async delete(typeId: string): Promise<any> {
    try {
      return await this.typeModel.deleteOne({ _id: typeId });
    } catch (error) {
      throw new HttpException(null, 200);
    }
  }

  /**
   * 修改指定id的type
   * @param putTypeDto
   */
  async put(putTypeDto: PutTypeDto) {
    try {
      const { id, ...update } = putTypeDto;
      return await this.typeModel.updateOne(
        {
          _id: id,
        },
        {
          $set: update,
          $currentDate: { lastModified: true },
        },
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  /**
   * 查询指定id的type
   * @param typeId
   */
  async getOne(typeId: string) {
    try {
      return await this.typeModel.findById(typeId);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  /**
   * 返回所有的type
   * 查询essays中有多少条包含该type的数据条数，假删除的不包含在内
   */
  async getAll() {
    const types: TypeClass[] = await this.typeModel.aggregate([
      {
        $lookup: {
          from: DatabaseNames.essays,
          localField: '_id',
          foreignField: 'types',
          as: 'len',
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          len: {
            $filter: {
              input: '$len',
              as: 'item',
              cond: { $eq: ['$$item.isDelete', false] },
            },
          },
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          len: {
            $cond: {
              if: {
                $isArray: '$len',
              },
              then: {
                $size: '$len',
              },
              else: '0',
            },
          },
        },
      },
    ]);
    return types.map(t => new this.typeModel(t));
  }
}
