import { Module } from "@nestjs/common";
import { healthController } from "./health.controller";
import { MetricsServices } from "./metrics.service";

@Module({
    controllers: [healthController],
    providers: [MetricsServices],
    exports: [MetricsServices]
})
export class HealthModule {}