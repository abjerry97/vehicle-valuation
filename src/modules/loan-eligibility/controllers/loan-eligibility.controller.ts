import { Controller, Get, Param } from '@nestjs/common';
import { LoanEligibilityService } from '../services/loan-eligibility.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('LoanEligibility')
@Controller('loan-eligibility')
export class LoanEligibilityController {
  constructor(
    private readonly loanEligibilityService: LoanEligibilityService,
  ) {}

  @Get('vin')
  @ApiOperation({ summary: '`Vehicle valuation with VIN ${vin} not found.' })
  @ApiResponse({
    status: 200,
    description: 'You meet the minimum loan requirment.',
  })
  @ApiResponse({
    status: 404,
    description: "You don't meet the minimum requirement for request a loan",
  })
  findAll(@Param('vin') vin: string) {
    return this.loanEligibilityService.checkEligibility(vin);
  }
}
