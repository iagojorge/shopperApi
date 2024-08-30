import { getHidometro } from "./service";

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
    const { image } = req.body;

    const data = getinlineData(image)

    const leitura = await getHidometro(data);

    res.json("Operação realizada com sucesso" + {leitura});
  } catch (error: any) {
    res.status(400).json({ error_code: "INVALID_DATA", error_description: "Dados invalidos" });
  }
}
