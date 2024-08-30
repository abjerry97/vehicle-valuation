import { Module } from '@nestjs/common';
import { LoanApplicationService } from './services/loan-application.service';
import { LoanApplicationController } from './controllers/loan-application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from 'src/entities/vehicle.entity';
import { LoanApplication } from 'src/entities/loan-application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, LoanApplication])],
  controllers: [LoanApplicationController],
  providers: [LoanApplicationService],
})
export class LoanApplicationModule {}
