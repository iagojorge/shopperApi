export enum ErrorMessage {
  INVALID_DATA = "Os dados fornecidos no corpo da requisição são inválidos.",
  MEASURE_NOT_FOUND = "Leitura não encontrada.",
  CONFIRMATION_DUPLICATE = "Leitura já confirmada.",
  INVALID_TYPE = "Parâmetro measure type diferente de WATER ou GAS.",
  DOUBLE_REPORT = "Já existe uma leitura para este tipo no mês atual."
}
export type ErrorMessageKey = keyof typeof ErrorMessage;
