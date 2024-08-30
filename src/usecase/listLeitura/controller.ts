import { listLeituraByCustomer } from './service';
    
export function getLeituras(req:any, res:any) {
  const customerCode = req.params.customerCode;
  const measureType = req.query.measure_type;

  try {
    const leituras = listLeituraByCustomer(customerCode, measureType);
    res.json(leituras);
  } catch (error) {
    console.error('Error', error);
  }
}