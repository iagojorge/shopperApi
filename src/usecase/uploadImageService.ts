import { AppDataSource } from "../infra/db/data-source";
import { Customer } from "../infra/entity/customer";
import { Measure } from "../infra/entity/measure";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

export async function getHidometro(data: any) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt =
      "Descreva o apenas o número que é mostrado no display do medidor";

    const generatedContent = await model.generateContent([prompt, data]);

    return generatedContent.response.text();
  } catch (error) {
    throw new Error("Erro ao consultar a API do Google Generative");
  }
}

export type MeasureType = "WATER" | "GAS";

interface ImageRequest {
  image: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: MeasureType;
}

function isValidMeasureType(type: any): type is MeasureType {
  return type === "WATER" || type === "GAS";
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

export async function uploadImageService(req: any, res: any) {
  try {
    const { image, customer_code, measure_datetime, measure_type } =
      req.body as ImageRequest;

    if (!isValidMeasureType(measure_type)) {
      return res.status(400).json({
        error_code: "INVALID_MEASURE_TYPE",
        error_description:
          "Tipo de medida inválido. Deve ser 'WATER' ou 'GAS'.",
      });
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
      return res.status(409).json({
        error_code: "DOUBLE_REPORT",
        error_description: "Leitura do mês já realizada.",
      });
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
    res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "Dados invalidos",
    });
  }
}
