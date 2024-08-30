import fs from 'fs';
import path from 'path';


function readData() {
  const filePath = path.resolve(__dirname, '../../fakeDB.json');
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}


export function listLeituraByCustomer(customerCode:string, measureType:string) {
  const data = readData();
  
  let filteredData = data.filter((item: { customer_code: string; }) => item.customer_code === customerCode);
  
  if (measureType) {
    const measureTypeUpper = measureType.toUpperCase();
    filteredData = filteredData.filter((item: { measure_type: string; }) => item.measure_type.toUpperCase() === measureTypeUpper);
  }
  
  return filteredData;
}