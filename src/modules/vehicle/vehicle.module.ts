import { Module } from '@nestjs/common';
import { VehicleService } from './services/vehicle.service';
import { VehicleController } from './controllers/vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from 'src/entities/vehicle.entity';
import { Valuation } from 'src/entities/valuation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Valuation])],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
