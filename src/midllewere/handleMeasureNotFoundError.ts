
export function handleMeasureNotFoundError(err: any, _req: any, res: any, next: any) {
  if (err.error_code === "MEASURE_NOT_FOUND") {
    return res.status(404).json({
      error_code: err.error_code,
      error_description: err.error_description,
    });
  }
  next(err);
}
