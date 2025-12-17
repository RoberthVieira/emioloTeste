import { Module } from '@nestjs/common';
import { InferenceController } from './inference.controller';
import { InferenceService } from './inference.service';
import { MockInferenceProvider } from './providers/mock-inference.provider';
import { INFERENCE_PROVIDER } from './inference.constants'; 

@Module({
  controllers: [InferenceController],
  providers: [
    InferenceService,
    {
      provide: INFERENCE_PROVIDER, 
      useClass: MockInferenceProvider,
    },
  ],
})
export class InferenceModule {}