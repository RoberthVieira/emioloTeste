export interface InferenceProvider {
    name: string;

    // Método responsável por executar a inferência
    // A implementação concreta será feita futuramente
    infer(input: unknown): Promise<unknown>
}