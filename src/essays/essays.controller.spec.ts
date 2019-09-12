import { Test, TestingModule } from '@nestjs/testing';
import { EssaysController } from './essays.controller';

describe('Essays Controller', () => {
  let controller: EssaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EssaysController],
    }).compile();

    controller = module.get<EssaysController>(EssaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
