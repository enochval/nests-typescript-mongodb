import { Test, TestingModule } from '@nestjs/testing';
import { HasherService } from './hasher.service';

describe('HasherService', () => {
  let service: HasherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HasherService],
    }).compile();

    service = module.get<HasherService>(HasherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
