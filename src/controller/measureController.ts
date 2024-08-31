import express from "express";
import { confirmLeituraService } from "../usecase/confirmLeituraService";

const measureRouter = express.Router();

measureRouter.patch("/confirm", confirmLeituraService);

export default measureRouter;