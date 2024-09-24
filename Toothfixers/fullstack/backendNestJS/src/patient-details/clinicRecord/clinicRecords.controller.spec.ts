import { Test, TestingModule } from '@nestjs/testing';
import { RecordsController } from './clinicRecords.controller';
import { RecordsService } from './clinicRecords.service';

describe('RecordsController', () => {
  let controller: RecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecordsController],
      providers: [RecordsService],
    }).compile();

    controller = module.get<RecordsController>(RecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
