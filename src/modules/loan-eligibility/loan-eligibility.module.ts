import { Module } from '@nestjs/common';
import { LoanEligibilityService } from './services/loan-eligibility.service';
import { LoanEligibilityController } from './controllers/loan-eligibility.controller';
import { Valuation } from 'src/entities/valuation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Valuation])],
  controllers: [LoanEligibilityController],
  providers: [LoanEligibilityService],
})
export class LoanEligibilityModule {}
