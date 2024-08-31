import { getHidometro } from "./service";
import { AppDataSource } from "../../infra/db/data-source";
import { Customer } from "../../infra/entity/customer";
import { Measure } from "../../infra/entity/measure";

export type MeasureType = "WATER" | "GAS";

interface ImageRequest {
  image: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: MeasureType;
}

function getinlineData(image: string) {
  var mimeType: string = "";

  const [metadata, image64] = image.split(",");

  const mimeTypeMatch = metadata.match(/:(.*?);/);

  if (mimeTypeMatch) {
    mimeType = mimeTypeMatch[1];
  }

  return {
    inlineData: {
      data: image64,
      mimeType: mimeType,
    },
  };
}

export async function uploadImageController(req: any, res: any) {
  try {
    const { image, customer_code, measure_datetime, measure_type }  =
      req.body as ImageRequest;
      
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

    if (customer.measures) {
      const measureCustomer = customer.measures.some((measure) => {
        measure.measureType === measure_type;
      });

      if (!measureCustomer) {
        const measure = new Measure();
        measure.image = image;
        measure.measureType = measure_type;
        measure.measureDatetime = new Date(measure_datetime);
        measure.hasConfirmed = false;
        measure.measureValue = parseInt(leitura, 10);
        measure.customer = customer;

        await AppDataSource.manager.save(measure);

        res.json({ "Operação realizada com sucesso": leitura });
      } else {
        return res.status(409).json({
          error_code: "DOUBLE_REPORT",
          error_description: "Leitura do mês já realizada.",
        });
      }
    }
  } catch (error: any) {
    res
      .status(400)
      .json({
        error_code: "INVALID_DATA",
        error_description: "Dados invalidos",
      });
  }
}
