import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from '../../entities/vehicle.entity';
import { Valuation } from '../../entities/valuation.entity';
import { LoanApplication } from '../../entities/loan-application.entity';
import { AppController } from './controller/app.controller';
import { AppService } from './services/app.service';
import { User } from 'src/entities/user.entity';
import { VehicleModule } from '../vehicle/vehicle.module';
import { ValuationModule } from '../valuation/valuation.module';
import { LoanApplicationModule } from '../loan-application/loan-application.module';
import { LoanEligibilityModule } from '../loan-eligibility/loan-eligibility.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      // database: ':memory:', // Use ':memory:' for an in-memory database
      database: 'database.sqlite',
      entities: [Vehicle, User, Valuation, LoanApplication],
      synchronize: true,
    }),
    // UserModule,
    ValuationModule,
    VehicleModule,
    LoanApplicationModule,
    LoanEligibilityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
