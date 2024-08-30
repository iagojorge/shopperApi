import fs from "fs";
import path from "path";

function readData() {
  const filePath = path.resolve(__dirname, "../../fakeDB.json");
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

function writeData(data: any) {
  const filePath = path.resolve(__dirname, "../../fakeDB.json");
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

export function confirmReading(measureUuid: string, confirmedValue: string) {
  const data = readData();
  const reading = data.find(
    (item: { measure_uuid: string }) => item.measure_uuid === measureUuid
  );

  if (!reading) {
    throw new Error("Reading not found");
  }

  if (reading.confirmed) {
    throw new Error("Reading already confirmed");
  }

  reading.confirmed = true;
  reading.confirmed_value = confirmedValue;

  writeData(data);

  return reading;
}
