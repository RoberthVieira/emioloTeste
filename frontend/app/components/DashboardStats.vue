<template>
    <section class="dashboard">
        <h2>Estatísticas</h2>

        <div class="stats-grid">
            <div class="stat-card">
                <span class="label">Eventos processados</span>
                <strong>{{ stats.totalEvents }}</strong>
            </div>

            <div class="stat-card high">
                <span class="label">Risco alto</span>
                <strong>{{ stats.highRiskPercentage }}%</strong>
            </div>

            <div class="stat-card">
                <span class="label">Emoção dominante</span>
                <strong>{{ stats.topEmotion }}</strong>
            </div>

            <div class="stat-card">
                <span class="label">Latência média</span>
                <strong>{{ stats.avgLatency }} ms</strong>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'

    type DashboardStats = {
        totalEvents: number
        highRiskPercentage: number
        topEmotion: string
        avgLatency: number
    }

    const stats = ref<DashboardStats>({
        totalEvents: 0,
        highRiskPercentage: 0,
        topEmotion: '-',
        avgLatency: 0
    })

    /**
     * MOCK — depois você troca por fetch('/health/metrics')
     */
    onMounted(() => {
    stats.value = {
        totalEvents: 128,
        highRiskPercentage: 34,
        topEmotion: 'happy',
        avgLatency: 14
    }
})
</script>

<style scoped>
.dashboard {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
}

h2 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.stat-card {
  background: white;
  border-radius: 6px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-card.high {
  border-left: 4px solid #dc2626;
}

.label {
  font-size: 0.75rem;
  color: #555;
}

strong {
  font-size: 1.1rem;
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>