// Token de injeção usado para identificar o provider de inferência.

//Necessário porque interfaces não existem em tempo de execução, então o Nest precisa de um identificador explícito para saber qual implementação injetar (mock ou real).

export const INFERENCE_PROVIDER = 'INFERENCE_PROVIDER';