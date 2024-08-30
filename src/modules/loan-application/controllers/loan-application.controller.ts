import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LoanApplicationService } from '../services/loan-application.service';
import { CreateLoanApplicationDto } from '../dto/create-loan-application.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Valuation')
@Controller('loan-application')
export class LoanApplicationController {
  constructor(
    private readonly loanApplicationService: LoanApplicationService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Loan Application' })
  @ApiResponse({
    status: 201,
    description: 'The Loan Application has been successfully created.',
  })
  create(@Body() createLoanApplicationDto: CreateLoanApplicationDto) {
    return this.loanApplicationService.createLoanApplication(
      createLoanApplicationDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all Loan Application ' })
  @ApiResponse({ status: 200, description: 'Loan Application found.' })
  @ApiResponse({ status: 404, description: 'Loan Application not found.' })
  findAll() {
    return this.loanApplicationService.getLoanApplication();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Loan Application by ID' })
  @ApiResponse({ status: 200, description: 'Loan Application found.' })
  @ApiResponse({ status: 404, description: 'Loan Application not found.' })
  findOne(@Param('id') id: string) {
    return this.loanApplicationService.getLoanApplicationById(+id);
  }
}
