import { Injectable, Inject } from '@nestjs/common';
import type { InferenceProvider } from './interfaces/inference-provider.interface';
import { INFERENCE_PROVIDER } from './inference.constants';

@Injectable()
export class InferenceService {
  constructor(
    @Inject(INFERENCE_PROVIDER)
    private readonly inferenceProvider: InferenceProvider, 
  ) {}

  async processFrames(frames: string[]){
    // Aqui o service não sabe SE é mock ou real
    return this.inferenceProvider.infer(frames);
  }
}
