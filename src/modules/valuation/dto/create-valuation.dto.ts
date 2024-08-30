import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateValuationDto {
  @ApiProperty({ description: 'Vehicle Identification Number' })
  vin: string;

  @ApiProperty({ description: 'Estimated value of the vehicle' })
  estimatedValue: number;

  @ApiPropertyOptional({
    description: 'Additional details about the valuation',
  })
  valuationDetails?: string;
}
