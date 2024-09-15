import { Test, TestingModule } from '@nestjs/testing';
import { BrunchesController } from './brunches.controller';

describe('BrunchesController', () => {
  let controller: BrunchesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrunchesController],
    }).compile();

    controller = module.get<BrunchesController>(BrunchesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
