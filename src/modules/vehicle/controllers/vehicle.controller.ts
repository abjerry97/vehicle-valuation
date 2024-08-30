import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VehicleService } from '../services/vehicle.service';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { Vehicle } from 'src/entities/vehicle.entity';
import { CreateValuationDto } from 'src/modules/valuation/dto/create-valuation.dto';
import { Valuation } from 'src/entities/valuation.entity';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new vehicle' })
  @ApiResponse({
    status: 201,
    description: 'The vehicle has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Duplicate Entry' })
  async createVehicle(
    @Body() createVehicleDto: CreateVehicleDto,
  ): Promise<Vehicle> {
    return await this.vehicleService.createVehicle(createVehicleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all vehicles' })
  @ApiResponse({ status: 200, description: 'Vehicles found.' })
  @ApiResponse({ status: 404, description: 'Vehicles not found.' })
  async getAllVehicles(): Promise<Vehicle[]> {
    const vehicle = await this.vehicleService.getAllVehicles();
    if (!vehicle) {
      throw new NotFoundException('Vehicles not found');
    }
    return vehicle;
  }
  @Get(':vin')
  @ApiOperation({ summary: 'Get a vehicle by VIN' })
  @ApiResponse({ status: 200, description: 'Vehicle found.' })
  @ApiResponse({ status: 404, description: 'Vehicle not found.' })
  async getVehicleByVin(@Param('vin') vin: string): Promise<Vehicle> {
    const vehicle = await this.vehicleService.getVehicleByVin(vin);
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    return vehicle;
  }

  @Post('valuation')
  @ApiOperation({ summary: 'Create a valuation for a vehicle' })
  @ApiResponse({
    status: 201,
    description: 'The valuation has been successfully created.',
  })
  @ApiResponse({ status: 404, description: 'Vehicle not found.' })
  async createValuation(
    @Body() createValuationDto: CreateValuationDto,
  ): Promise<Valuation> {
    return await this.vehicleService.createValuation(createValuationDto);
  }

  @Get(':vin/valuations')
  @ApiOperation({ summary: 'Get all valuations for a specific vehicle by VIN' })
  @ApiResponse({ status: 200, description: 'Valuations found.' })
  @ApiResponse({ status: 404, description: 'Vehicle not found.' })
  async getValuationsByVin(@Param('vin') vin: string): Promise<Valuation[]> {
    return await this.vehicleService.getValuationsByVin(vin);
  }
}
