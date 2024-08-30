import { PartialType } from '@nestjs/swagger';
import { CreateLoanApplicationDto } from './create-loan-application.dto';

export class UpdateLoanApplicationDto extends PartialType(
  CreateLoanApplicationDto,
) {}
