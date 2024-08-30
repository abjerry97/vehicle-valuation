import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateValuationDto } from '../dto/create-valuation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from 'src/entities/vehicle.entity';
import { Repository } from 'typeorm';
import { Valuation } from 'src/entities/valuation.entity';

@Injectable()
export class ValuationService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Valuation)
    private readonly valuationRepository: Repository<Valuation>,
  ) {}

  async createValuation(
    createValuationDto: CreateValuationDto,
  ): Promise<Valuation> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { vin: createValuationDto.vin },
    });

    if (!vehicle) {
      throw new NotFoundException(
        `Vehicle with VIN ${createValuationDto.vin} not found.`,
      );
    }

    const existingVehicleValuation = await this.valuationRepository.find({
      where: { vehicle: { vin: createValuationDto.vin } },
    });

    if (existingVehicleValuation) {
      throw new ForbiddenException(
        `Duplicate Entry: Valuation for vechicle with vin: ${createValuationDto.vin}`,
      );
    }

    const valuation = this.valuationRepository.create({
      vehicle,
      estimatedValue: createValuationDto.estimatedValue,
      valuationDetails: createValuationDto.valuationDetails,
    });

    return await this.valuationRepository.save(valuation);
  }

  async getValuationById(id: number): Promise<Valuation> {
    const valuation = await this.valuationRepository.findOne({
      where: { id },
      relations: ['vehicle'],
    });

    if (!valuation) {
      throw new NotFoundException(`Valuation with ID ${id} not found.`);
    }

    return valuation;
  }

  async getAllValuations(): Promise<Valuation[]> {
    return await this.valuationRepository.find({ relations: ['vehicle'] });
  }
}
