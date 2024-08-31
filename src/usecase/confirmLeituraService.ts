import { AppDataSource } from "../infra/db/data-source";
import { Measure } from "../infra/entity/measure";


export async function confirmLeituraService(req: any, res: any) {
  const { measure_uuid, confirmed_value } = req.body;

  if (!measure_uuid || confirmed_value === undefined) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "O measure_uuid e confirmed_value são obrigatórios.",
    });
  }

  try {
    const measure = await AppDataSource.getRepository(Measure).findOne({
      where: { id: measure_uuid },
    });

    if (!measure) {
      return res.status(404).json({
        error_code: "MEASURE_NOT_FOUND",
        error_description: "Leitura não encontrada.",
      });
    }

    if (measure.hasConfirmed) {
      return res.status(409).json({
        error_code: "CONFIRMATION_DUPLICATE",
        error_description: "Leitura do mês já realizada.",
      });
    }

    if (parseInt(confirmed_value, 10) !== measure.measureValue) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description:
          "O valor confirmado não corresponde ao valor da medida.",
      });
    }

    measure.hasConfirmed = true;
    await AppDataSource.getRepository(Measure).save(measure);

    return res.json({
      success: true,
      message: "Leitura confirmada com sucesso.",
    });
  } catch (error) {
    console.error("Error confirming leitura:", error);
    return res.status(500).json({ message: "Erro ao confirmar leitura." });
  }
}