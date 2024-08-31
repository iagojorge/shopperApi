import express from "express";
import { confirmLeituraService } from "../service/confirmLeituraService";
import { handleInvalidDataError } from "../midllewere/handleInvalidDataError";
import { handleMeasureNotFoundError } from "../midllewere/handleMeasureNotFoundError";
import { handleConfirmationDuplicateError } from "../midllewere/handleConfirmationDuplicateError";

const measureRouter = express.Router();

measureRouter.patch("/confirm", confirmLeituraService);

measureRouter.use(handleInvalidDataError);
measureRouter.use(handleMeasureNotFoundError);
measureRouter.use(handleConfirmationDuplicateError);

export default measureRouter;
