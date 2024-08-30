import { DataSource } from "typeorm";
import { Measure } from "../entity/measure";
import { Customer } from "../entity/customer";
import * as dotenv from "dotenv";

dotenv.config(); 

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE as "postgres",
  host: process.env.POSTGRES_URL,
  port: parseInt(process.env.POSTGRES_PORT as string, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [Customer, Measure],
});