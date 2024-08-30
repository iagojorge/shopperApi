import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer";

@Entity('measure')
export class Measure {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 20 })
  measureType!: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  measureDatetime!: Date;

  @Column({ type: 'text' })
  image!: string;

  @Column({ type: 'boolean', default: false })
  hasConfirmed!: boolean;

  @ManyToOne(() => Customer, customer => customer.measures)
  customer!: Customer;
}