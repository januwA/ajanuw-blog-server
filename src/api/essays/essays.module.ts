import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EssaysController } from './essays.controller';
import { EssaysService } from './essays.service';
import { Essay, EssaySchema } from './schemas/essay.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Essay.name, schema: EssaySchema }]),
  ],
  controllers: [EssaysController],
  providers: [EssaysService],
})
export class EssaysModule {}
