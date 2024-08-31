import express from "express";
import { listLeituraService } from '../service/listLeituraService';
import { uploadImageService } from "../service/uploadImageService";
import { handleInvalidTypeError } from "../midllewere/handleInvalidTypeError";
import { handleMeasureNotFoundError } from "../midllewere/handleMeasureNotFoundError";
import { handleInvalidDataError } from "../midllewere/handleInvalidDataError";
import { handleDoubleReportError } from "../midllewere/handleDoubleReportError";

const customerRouter = express.Router();

customerRouter.post('/upload', uploadImageService);
customerRouter.get("/:customerCode/list", listLeituraService);

customerRouter.use(handleInvalidTypeError);
customerRouter.use(handleMeasureNotFoundError);
customerRouter.use(handleInvalidDataError);
customerRouter.use(handleDoubleReportError);

export default customerRouter;