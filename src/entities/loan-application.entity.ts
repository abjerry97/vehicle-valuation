import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';

export enum LoanStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity()
export class LoanApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vehicle, { cascade: true })
  vehicle: Vehicle;

  @Column()
  applicantName: string;

  @Column()
  applicantEmail: string;

  @Column()
  loanAmount: number;

  @Column({
    type: 'text',
    default: LoanStatus.PENDING,
  })
  status: LoanStatus;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
