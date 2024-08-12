import { Test, TestingModule } from '@nestjs/testing';
import { FilialsController } from './filials.controller';

describe('FilialsController', () => {
  let controller: FilialsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilialsController],
    }).compile();

    controller = module.get<FilialsController>(FilialsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
