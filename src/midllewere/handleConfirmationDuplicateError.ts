export function handleConfirmationDuplicateError(err: any, _req: any, res: any, next: any) {
  if (err.error_code === "CONFIRMATION_DUPLICATE") {
    return res.status(409).json({
      error_code: err.error_code,
      error_description: err.error_description,
    });
  }
  next(err);
}
