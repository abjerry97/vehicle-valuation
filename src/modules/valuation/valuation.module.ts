import { Module } from '@nestjs/common';
import { ValuationService } from './services/valuation.service';
import { ValuationController } from './controllers/valuation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from 'src/entities/vehicle.entity';
import { Valuation } from 'src/entities/valuation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Valuation])],
  controllers: [ValuationController],
  providers: [ValuationService],
})
export class ValuationModule {}
