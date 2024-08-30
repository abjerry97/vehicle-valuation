import { PartialType } from '@nestjs/swagger';
import { CreateLoanEligibilityDto } from './create-loan-eligibility.dto';

export class UpdateLoanEligibilityDto extends PartialType(
  CreateLoanEligibilityDto,
) {}
