import { Test, TestingModule } from '@nestjs/testing';
import { EssaysService } from './essays.service';

describe('EssaysService', () => {
  let service: EssaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EssaysService],
    }).compile();

    service = module.get<EssaysService>(EssaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
