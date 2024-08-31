import { Request, Response } from 'express';
import { AppDataSource } from "../infra/db/data-source";
import { Customer } from "../infra/entity/customer";
import { Measure } from "../infra/entity/measure";

export async function listLeituraByCustomer(
  customerCode: string,
  measureType?: string
) {
  const customer = await AppDataSource.getRepository(Customer).findOne({
    where: { customerCode },
    relations: ["measures"],
  });

  if (!customer) {
    return {
      customer_code: customerCode,
      measures: [],
    };
  }

  let leituras = customer.measures;
  if (measureType) {
    leituras = leituras?.filter(
      (measure) => measure.measureType.toUpperCase() === measureType
    );
  }

  const formattedLeituras = leituras?.map((measure) => ({
    measure_uuid: measure.id,
    measure_datetime: measure.measureDatetime,
    measure_type: measure.measureType,
    has_confirmed: measure.hasConfirmed,
    image_url: measure.image,
  }));

  return {
    customer_code: customer.customerCode,
    measures: formattedLeituras,
  };
}

export async function listLeituraService(req: Request, res: Response) {
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
