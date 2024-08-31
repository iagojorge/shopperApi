export function handleInvalidTypeError(err: any, _req: any, res: any, next: any) {
  if (err.error_code === "INVALID_TYPE") {
    return res.status(400).json({
      error_code: err.error_code,
      error_description: err.error_description,
    });
  }
  next(err);
}
