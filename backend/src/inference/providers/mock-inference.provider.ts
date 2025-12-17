import { InferenceProvider } from "../interfaces/inference-provider.interface";

//Implementação fake usada apenas para testes e desenvolvimento inicial
export class MockInferenceProvider implements InferenceProvider{

    name = 'mock-provider';

    async infer(input: unknown): Promise<unknown> {
        return{
            status: 'sucsses',
            inference: {
                label: 'mock-result',
                confidence: 0.99
            },
            receivedFrames: input
        }
    }
}