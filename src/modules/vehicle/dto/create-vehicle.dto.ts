import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty({ description: 'The VIN of the vehicle' })
  vin: string;

  @ApiProperty({ description: 'The make of the vehicle' })
  make: string;

  @ApiProperty({ description: 'The model of the vehicle' })
  model: string;

  @ApiProperty({ description: 'The year the vehicle was manufactured' })
  year: number;

  @ApiProperty({ description: 'The mileage of the vehicle' })
  mileage: number;
}
