import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EssaysController } from './essays.controller';
import { EssaysService } from './essays.service';
import { DatabaseNames } from '~src/databases-names';
import { EssaySchema } from './schemas/essay.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DatabaseNames.essays, schema: EssaySchema },
    ]),
  ],
  controllers: [EssaysController],
  providers: [EssaysService],
})
export class EssaysModule {}
