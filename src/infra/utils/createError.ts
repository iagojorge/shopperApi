import { ErrorMessage, ErrorMessageKey } from "../enums/ErrorMessage";
import { ApiError } from "../models/ApiError";

export function createError(errorMessage: ErrorMessageKey): ApiError {
  return {
    error_code: errorMessage,
    error_description: ErrorMessage[errorMessage],
  };
}
