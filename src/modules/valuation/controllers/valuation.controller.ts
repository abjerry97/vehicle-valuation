import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ValuationService } from '../services/valuation.service';
import { CreateValuationDto } from '../dto/create-valuation.dto';
import { Valuation } from 'src/entities/valuation.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Valuation')
@Controller('valuation')
export class ValuationController {
  constructor(private readonly valuationService: ValuationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new valuation' })
  @ApiResponse({
    status: 201,
    description: 'The valuation has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Duplicate Entry' })
  async createValuation(
    @Body() createValuationDto: CreateValuationDto,
  ): Promise<Valuation> {
    return await this.valuationService.createValuation(createValuationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a valuation by ID' })
  @ApiResponse({ status: 200, description: 'Valuation found.' })
  @ApiResponse({ status: 404, description: 'Valuation not found.' })
  async getValuationById(@Param('id') id: number): Promise<Valuation> {
    return await this.valuationService.getValuationById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all valuations ' })
  @ApiResponse({ status: 200, description: 'Valuations found.' })
  @ApiResponse({ status: 404, description: 'Valuations not found.' })
  async getAllValuations(): Promise<Valuation[]> {
    return await this.valuationService.getAllValuations();
  }
}
