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
  background: #111; /* Fundo interno mais escuro */
  padding: 1.2rem;
  border-radius: 4px;
  border: 1px solid #333;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.5);
}

h2 {
  font-size: 0.9rem;
  margin-bottom: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #888;
  border-left: 3px solid #ffe81f;
  padding-left: 10px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-card {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 4px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  transition: all 0.3s ease;
}

.stat-card.high {
  border-color: #dc2626;
  background: rgba(220, 38, 38, 0.05);
  box-shadow: 0 0 10px rgba(220, 38, 38, 0.2);
}

.stat-card.high strong {
  color: #ef4444;
  text-shadow: 0 0 5px rgba(239, 68, 68, 0.5);
}

.label {
  font-size: 0.7rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
}

strong {
  font-size: 1.3rem;
  color: #ffe81f; 
  font-family: 'Courier New', Courier, monospace; 
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>