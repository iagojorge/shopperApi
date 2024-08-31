import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function getHidometro(data: any) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Descreva o apenas o número que é mostrado no display do medidor";

    const generatedContent = await model.generateContent([prompt, data]);

    return generatedContent.response.text();
  } catch (error) {
    throw new Error("Erro ao consultar a API do Google Generative");
  }
}
