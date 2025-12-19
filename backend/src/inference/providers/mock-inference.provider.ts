import { InferenceProvider, InferenceResult } from "../interfaces/inference-provider.interface";

// Implementação fake usada apenas para testes e desenvolvimento inicial
export class MockInferenceProvider implements InferenceProvider {

    name = 'mock-provider';

    async infer(_: unknown, requestId: string): Promise<InferenceResult> {
        return {
            emotions: [
                { label: 'happy', score: 0.83 }
            ],

            ppe: [
                { class: 'helmet', score: 0.91, bbox: [12, 30, 120, 160] }
            ],

            risk: {
                level: 'HIGH',
                score: 0.85,
                reasons: ['no-helmet', 'anger']
            },

            latency_ms: 14
        };
    }
}
