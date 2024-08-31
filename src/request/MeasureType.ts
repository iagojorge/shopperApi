
export type MeasureType = "WATER" | "GAS";
export interface CustomerRequest {
  image: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: MeasureType;
}

export function isValidMeasureType(type: any): type is MeasureType {
  return type === "WATER" || type === "GAS";
}
