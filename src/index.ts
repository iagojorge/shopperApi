import express from "express";

import { AppDataSource } from "./infra/db/data-source";
import * as dotenv from "dotenv";
import measureRouter from "./controller/measureController";
import customerRouter from "./controller/customerController";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json({ limit: "10mb" }));

app.use("/api", measureRouter, customerRouter);

AppDataSource.initialize();

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
