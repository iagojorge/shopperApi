import { Request, Response } from 'express';
import { listLeituraByCustomer } from './service';

export async function getLeituras(req: Request, res: Response) {
  const customerCode = req.params.customerCode;
  const measureType = req.query.measure_type as string; 

 
  if (measureType && !["WATER", "GAS"].includes(measureType.toUpperCase())) {
    return res.status(400).json({
      error_code: "INVALID_TYPE",
      error_description: "Tipo de medição não permitida"
    });
  }

  try {
    const leituras = await listLeituraByCustomer(customerCode, measureType?.toUpperCase());
    
    if (!leituras.measures?.length) {
      return res.status(404).json({
        error_code: "MEASURES_NOT_FOUND",
        error_description: "Nenhuma leitura encontrada"
      });
    }

    res.status(200).json(leituras);
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ message: 'Error fetching leituras' });
  }
}
