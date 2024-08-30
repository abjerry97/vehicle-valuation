import { Test, TestingModule } from '@nestjs/testing';
import { LoanApplicationController } from '../controllers/loan-application.controller';
import { LoanApplicationService } from '../services/loan-application.service';

describe('LoanApplicationController', () => {
  let controller: LoanApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanApplicationController],
      providers: [LoanApplicationService],
    }).compile();

    controller = module.get<LoanApplicationController>(
      LoanApplicationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
