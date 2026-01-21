import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { healthController } from "./health.controller";
import { MetricsServices } from "./metrics.service";
import { MetricsRepository } from './metrics.repository';
import { Metric, MetricSchema } from './metrics.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Metric.name, schema: MetricSchema },
    ]),
  ],
  controllers: [healthController],
  providers: [MetricsServices, MetricsRepository],
  exports: [MetricsServices],
})
export class HealthModule {}