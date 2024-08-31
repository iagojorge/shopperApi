import { AppDataSource } from "../infra/db/data-source";
import { Measure } from "../infra/entity/measure";
import { createError } from "../infra/utils/createError";
import { MeasureRequest } from "../request/MeasureRequest";

export async function confirmLeituraService(req: any, res: any, next: any) {
  const { measure_uuid, confirmed_value } = req.body as MeasureRequest;

  if (!measure_uuid || confirmed_value === undefined) {
    return next(createError("INVALID_DATA"))
  }

  try {
    const measure = await AppDataSource.getRepository(Measure).findOne({
      where: { id: measure_uuid },
    });

    if (!measure) {
      return next(createError("MEASURE_NOT_FOUND"))
    }

    if (measure.hasConfirmed) {
      return next(createError("CONFIRMATION_DUPLICATE"))
    }

    measure.measureValue = confirmed_value;
    measure.hasConfirmed = true;
    await AppDataSource.getRepository(Measure).save(measure);

    return res.json({
      success: true,
      message: "Leitura confirmada com sucesso.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao confirmar leitura." });
  }
}
