import { Test, TestingModule } from '@nestjs/testing';
import { HomeDetailsService } from './home-details.service';

describe('HomeDetailsService', () => {
  let service: HomeDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeDetailsService],
    }).compile();

    service = module.get<HomeDetailsService>(HomeDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
