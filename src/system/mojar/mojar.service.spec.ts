import { Test, TestingModule } from '@nestjs/testing';
import { MojarService } from './mojar.service';

describe('MojarService', () => {
  let service: MojarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MojarService],
    }).compile();

    service = module.get<MojarService>(MojarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
