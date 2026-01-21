import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Metric, MetricDocument } from './metrics.schema';

@Injectable()
export class MetricsRepository {
  constructor(
    @InjectModel(Metric.name)
    private readonly metricModel: Model<MetricDocument>,
  ) {}

  async saveMetric(data: {
    latencyMs: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    isError: boolean;
  }) {
    const metric = new this.metricModel({
      latencyMs: data.latencyMs,
      riskLevel: data.riskLevel,
      isError: data.isError,
      createdAt: new Date(),
    });

    await metric.save();
  }
}