import { Controller, Get } from "@nestjs/common";
import { MetricsServices } from "./metrics.service";

@Controller('health')
export class healthController {
    constructor(private readonly metricsService: MetricsServices) {}

    @Get('metrics')
    getMetrics() {{
        return this.metricsService.getMetrics();
    }}
}