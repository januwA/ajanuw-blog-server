import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypesController } from './types.controller';
import { TypesService } from './types.service';
import { TypeSchema } from './schemas/type.schema';
import { DatabaseNames } from '~src/databases-names';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DatabaseNames.types, schema: TypeSchema },
    ]),
  ],
  controllers: [TypesController],
  providers: [TypesService],
})
export class TypesModule {}
