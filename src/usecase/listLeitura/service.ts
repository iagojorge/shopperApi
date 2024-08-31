import { AppDataSource } from "../../infra/db/data-source";
import { Customer } from "../../infra/entity/customer";
import { Measure } from "../../infra/entity/measure";

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
