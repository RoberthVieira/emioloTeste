import { Injectable } from '@nestjs/common';
import { MetricsRepository } from './metrics.repository';

@Injectable()
export class MetricsServices {
    constructor(
        private readonly metricsRepository: MetricsRepository
    ) {}

    private processedEvents = 0;
    private errorCount = 0;
    private latencies: number[] = [];
    private highRiskEvents = 0;
    private mediumRiskEvents = 0; 
    private lowRiskEvents = 0;

    async recordEvent(latencyMs: number, riskLevel: 'LOW' | 'MEDIUM' | 'HIGH') {
        this.processedEvents++;
        this.latencies.push(latencyMs);

        if (riskLevel === 'HIGH') this.highRiskEvents++;
        else if (riskLevel === 'MEDIUM') this.mediumRiskEvents++;
        else this.lowRiskEvents++;

        await this.metricsRepository.saveMetric({
            latencyMs,
            riskLevel,
            isError: false
        });
    }

    async recordError(latencyMs: number, riskLevel: 'LOW' | 'MEDIUM' | 'HIGH') {
        this.errorCount++;

        await this.metricsRepository.saveMetric({
          latencyMs,
          riskLevel,
          isError: true
        });
    }

    getMetrics() {
    const avgLatency =
        this.latencies.length > 0
            ? Math.round(
                this.latencies.reduce((a, b) => a + b, 0) /
                this.latencies.length
            )
        : 0;

        return {
            processedEvents: this.processedEvents,
            averageLatencyMs: avgLatency,
            errorRate:
                this.processedEvents > 0
                ? Number(
                    (this.errorCount / this.processedEvents).toFixed(3)
                )
            : 0,
            highRiskEvents: this.highRiskEvents,
            mediumRiskEvents: this.mediumRiskEvents,
            lowRiskEvents: this.lowRiskEvents,
            uptimeSeconds: Math.floor(process.uptime()),
        };
    }
}