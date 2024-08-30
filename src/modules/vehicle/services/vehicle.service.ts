import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Valuation } from 'src/entities/valuation.entity';
import { Vehicle } from 'src/entities/vehicle.entity';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { CreateValuationDto } from 'src/modules/valuation/dto/create-valuation.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Valuation)
    private readonly valuationRepository: Repository<Valuation>,
  ) {}

  async createVehicle(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const existingVehicle = await this.vehicleRepository.findOne({
      where: { vin: createVehicleDto.vin },
    });

    if (existingVehicle) {
      throw new ForbiddenException('Duplicate Entry');
    }

    const vehicle = this.vehicleRepository.create(createVehicleDto);
    return await this.vehicleRepository.save(vehicle);
  }

  async getAllVehicles(): Promise<Vehicle[]> {
    const vehicle = await this.vehicleRepository.find();

    if (!vehicle) {
      throw new NotFoundException('Vehicles not found');
    }

    return vehicle;
  }
  async getVehicleByVin(vin: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({ where: { vin } });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    return vehicle;
  }

  async createValuation(
    createValuationDto: CreateValuationDto,
  ): Promise<Valuation> {
    const vehicle = await this.getVehicleByVin(createValuationDto.vin);

    const valuation = this.valuationRepository.create({
      vehicle,
      estimatedValue: createValuationDto.estimatedValue,
      valuationDetails: createValuationDto.valuationDetails,
    });

    return await this.valuationRepository.save(valuation);
  }

  async getValuationsByVin(vin: string): Promise<Valuation[]> {
    const vehicle = await this.getVehicleByVin(vin);

    return await this.valuationRepository.find({
      where: { vehicle },
      order: { createdAt: 'DESC' },
    });
  }
}
