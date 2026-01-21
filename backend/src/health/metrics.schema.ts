import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MetricDocument = Metric & Document;

@Schema()
export class Metric {
  @Prop({ required: true })
  latencyMs: number;

  @Prop({ required: true })
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';

  @Prop({ required: true })
  isError: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const MetricSchema = SchemaFactory.createForClass(Metric);