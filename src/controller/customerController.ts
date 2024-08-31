import express from "express";
import { listLeituraService } from "../usecase/listLeituraService";
import { uploadImageService } from "../usecase/uploadImageService";

const customerRouter = express.Router();

customerRouter.post('/upload', uploadImageService);
customerRouter.get("/:customerCode/list", listLeituraService);

export default customerRouter;