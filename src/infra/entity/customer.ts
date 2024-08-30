import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Measure } from "./measure";

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id!: string ;

  @Column({ type: 'varchar', length: 50, unique: true })
  customerCode!: string;

  @OneToMany(() => Measure, measure => measure.customer)
  measures?: Measure[];
}