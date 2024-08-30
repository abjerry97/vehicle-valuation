import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Valuation } from 'src/entities/valuation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoanEligibilityService {
  constructor(
    @InjectRepository(Valuation)
    private readonly valuationRepository: Repository<Valuation>,
  ) {}

  async checkEligibility(vin: string) {
    const existingVehicleValuation = await this.valuationRepository.findOne({
      where: { vehicle: { vin: vin } },
    });
    if (!existingVehicleValuation) {
      throw new NotFoundException(
        `Vehicle valuation with VIN ${vin} not found.`,
      );
    }

    if (existingVehicleValuation.estimatedValue < 1500)
      throw new BadRequestException(
        "You don't meet the minimum requirement for request a loan",
      );

    return 'You meet the minimum loan requirment';
  }
}
