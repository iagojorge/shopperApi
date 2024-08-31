import { AppDataSource } from "../infra/db/data-source";
import { Customer } from "../infra/entity/customer";
import { Measure } from "../infra/entity/measure";
import { getinlineData } from "../infra/utils/getinlineData";
import { CustomerRequest, isValidMeasureType } from "../request/MeasureType";
import { createError } from "../infra/utils/createError";

import { getHidometro } from "./getHidometro";

export async function uploadImageService(req: any, res: any, next: any) {
  try {
    const { image, customer_code, measure_datetime, measure_type } =
      req.body as CustomerRequest;

    if (!isValidMeasureType(measure_type)) {
      return next(createError("INVALID_TYPE"));
    }

    const data = getinlineData(image);

    const leitura = await getHidometro(data);

    let customer = await AppDataSource.getRepository(Customer).findOne({
      where: { customerCode: customer_code },
      relations: ["measures"],
    });

    if (!customer) {
      customer = new Customer();
      customer.customerCode = customer_code;
      await AppDataSource.manager.save(customer);
    }

    const measureExists = customer.measures?.some(
      (measure) => measure.measureType === measure_type
    );

    if (measureExists) {
      return next(createError("DOUBLE_REPORT"));
    }

    const measure = new Measure();
    measure.image = image;
    measure.measureType = measure_type;
    measure.measureDatetime = new Date(measure_datetime);
    measure.hasConfirmed = false;
    measure.measureValue = parseInt(leitura, 10);
    measure.customer = customer;

    await AppDataSource.manager.save(measure);

    res.json({ "Operação realizada com sucesso": leitura });
  } catch (error: any) {
    return next(createError("INVALID_DATA"));
  }
}
