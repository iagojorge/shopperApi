import { confirmReading } from "./service";

export function confirmLeitura(req: any, res: any) {
  const { measure_uuid, confirmed_value } = req.body;

  if (
    typeof measure_uuid !== "string" ||
    typeof confirmed_value !== "string"
  ) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  try {
    const updatedReading = confirmReading(measure_uuid, confirmed_value);
    res.json({ message: "OK", data: updatedReading });
  } catch (error) {
    console.error("Error na hora de confirmar:", error);
  }
}
