import { Test, TestingModule } from '@nestjs/testing';
import { FilialsService } from './filials.service';

describe('FilialsService', () => {
  let service: FilialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilialsService],
    }).compile();

    service = module.get<FilialsService>(FilialsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
