import { Test, TestingModule } from '@nestjs/testing';
import { LoanEligibilityService } from '../services/loan-eligibility.service';

describe('LoanEligibilityService', () => {
  let service: LoanEligibilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoanEligibilityService],
    }).compile();

    service = module.get<LoanEligibilityService>(LoanEligibilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
