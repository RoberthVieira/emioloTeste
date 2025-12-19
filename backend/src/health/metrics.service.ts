import { Injectable } from '@nestjs/common';

@Injectable()
export class MetricsServices {
    private processedEvents = 0;
    private errorCount = 0;
    private latencies: number[] = [];

    recordEvent(latencyMs: number) {
        this.processedEvents++;
        this.latencies.push(latencyMs);
    }

    recordError() {
        this.errorCount++;
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
            uptimeSeconds: Math.floor(process.uptime()),
        };
    }
}