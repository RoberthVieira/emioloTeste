<template>
  <section class="events">
    <h2>Eventos recentes</h2>

    <ul v-if="eventos.length">
      <li
        v-for="evento in eventos"
        :key="evento.id"
        class="event-item"
      >
        <div class="event-main">
          <span class="label">{{ evento.label }}</span>

          <span
            class="risk"
            :class="evento.riskLevel.toLowerCase()"
          >
            {{ evento.riskLevel }}
          </span>
        </div>

        <div class="event-meta">
          <span class="confidence">
            Confiança: {{ evento.confidence.toFixed(2) }}
          </span>

          <span class="timestamp">
            {{ evento.timestamp }}
          </span>
        </div>
      </li>
    </ul>

    <p v-else class="empty">
      Nenhum evento recebido ainda
    </p>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useSocket } from '~/service/socket';

type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

type Evento = {
  id: string;
  label: string;
  confidence: number;
  riskLevel: RiskLevel;
  timestamp: string;
};

const eventos = ref<Evento[]>([]);
const socket = useSocket();

onMounted(() => {
  socket.on('inference-result', (data) => {
    const novoEvento: Evento = {
      id: crypto.randomUUID(),
      label: data.inference.label,
      confidence: data.inference.confidence,
      riskLevel: data.riskLevel ?? 'LOW',
      timestamp: new Date().toLocaleTimeString()
    };

    eventos.value.unshift(novoEvento);

    // mantém apenas os últimos 10
    if (eventos.value.length > 10) {
      eventos.value.pop();
    }
  });
});

onUnmounted(() => {
  socket.off('inference-result');
});
</script>

<style scoped>
.events {
  background-color: #f5f5ff;
  padding: 1rem;
  border-radius: 8px;
}

h2 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.event-item {
  background: #fff;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.event-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-weight: 600;
}

.risk {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 999px;
  font-weight: 600;
}

.low {
  background: #dcfce7;
  color: #166534;
}

.medium {
  background: #fef9c3;
  color: #854d0e;
}

.high {
  background: #fee2e2;
  color: #991b1b;
}

.event-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #555;
}

.empty {
  color: #666;
  font-size: 0.9rem;
}
</style>    