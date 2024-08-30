import { ApiProperty } from '@nestjs/swagger';

export class CreateLoanApplicationDto {
  id: number;
  @ApiProperty({ description: 'Vehicle Identification Number' })
  vin: string;
  @ApiProperty({ description: 'Aplicant name' })
  applicantName: string;
  @ApiProperty({ description: 'Aplicant email' })
  applicantEmail: string;
  @ApiProperty({ description: 'Loan Amount' })
  loanAmount: number;
}
