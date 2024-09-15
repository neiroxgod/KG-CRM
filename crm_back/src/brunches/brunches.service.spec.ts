import { Test, TestingModule } from '@nestjs/testing';
import { BrunchesService } from './brunches.service';

describe('BrunchesService', () => {
  let service: BrunchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrunchesService],
    }).compile();

    service = module.get<BrunchesService>(BrunchesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
