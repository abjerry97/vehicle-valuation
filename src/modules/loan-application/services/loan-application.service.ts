import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoanApplicationDto } from '../dto/create-loan-application.dto';
import { LoanApplication } from 'src/entities/loan-application.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from 'src/entities/vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoanApplicationService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(LoanApplication)
    private readonly loanAplicationRepository: Repository<LoanApplication>,
  ) {}

  async createLoanApplication(
    createLoanApplicationDto: CreateLoanApplicationDto,
  ): Promise<LoanApplication> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { vin: createLoanApplicationDto.vin },
    });

    if (!vehicle) {
      throw new NotFoundException(
        `Vehicle with VIN ${createLoanApplicationDto.vin} not found.`,
      );
    }

    const loanApplication = this.loanAplicationRepository.create({
      vehicle,
      applicantName: createLoanApplicationDto.applicantName,
      applicantEmail: createLoanApplicationDto.applicantEmail,
      loanAmount: createLoanApplicationDto.loanAmount,
    });

    return await this.loanAplicationRepository.save(loanApplication);
  }
  async getLoanApplicationById(id: number): Promise<LoanApplication> {
    const loanApplication = await this.loanAplicationRepository.findOne({
      where: { id },
      relations: ['vehicle'],
    });

    if (!loanApplication) {
      throw new NotFoundException(`Loan application with ID ${id} not found.`);
    }

    return loanApplication;
  }

  async getLoanApplication(): Promise<LoanApplication[]> {
    return await this.loanAplicationRepository.find({ relations: ['vehicle'] });
  }
}
