import { GoogleGenerativeAI, Part } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

export async function getHidometro(data: string | Part) {
  try {

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Descreva o número que é mostrado no display do medidor";

    const generatedContent = await model.generateContent([prompt, data]);

    return generatedContent.response.text();
  } catch (error) {
    throw new Error("Erro ao consultar a API do Google Generative");
  }
}
