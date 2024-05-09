import { Test, TestingModule } from '@nestjs/testing';
import { MojarController } from './mojar.controller';
import { MojarService } from './mojar.service';

describe('MojarController', () => {
  let controller: MojarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MojarController],
      providers: [MojarService],
    }).compile();

    controller = module.get<MojarController>(MojarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
