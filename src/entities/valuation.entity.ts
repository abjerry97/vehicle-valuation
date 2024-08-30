import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity()
export class Valuation {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn()
  @OneToOne(() => Vehicle, { cascade: true })
  vehicle: Vehicle;

  @Column()
  estimatedValue: number;

  @Column({ type: 'text', nullable: true })
  valuationDetails: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
