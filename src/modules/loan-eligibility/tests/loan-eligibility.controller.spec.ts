import { Test, TestingModule } from '@nestjs/testing';
import { LoanEligibilityController } from '../controllers/loan-eligibility.controller';
import { LoanEligibilityService } from '../services/loan-eligibility.service';

describe('LoanEligibilityController', () => {
  let controller: LoanEligibilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanEligibilityController],
      providers: [LoanEligibilityService],
    }).compile();

    controller = module.get<LoanEligibilityController>(
      LoanEligibilityController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
