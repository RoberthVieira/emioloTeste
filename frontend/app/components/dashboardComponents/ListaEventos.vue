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
  background-color: #111;
  padding: 1.2rem;
  border-radius: 4px;
  border: 1px solid #333;
  display: flex;
  flex-direction: column;
  height: 100%; /* Para preencher o container pai no Dashboard */
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

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto; /* Scroll interno para os logs */
}

.event-item {
  background: #1a1a1a;
  padding: 0.85rem;
  border-radius: 2px;
  margin-bottom: 0.75rem;
  border-left: 2px solid #444;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  transition: background 0.2s;
}

.event-item:hover {
  background: #222;
}

.event-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-weight: 600;
  color: #eee;
  font-size: 0.9rem;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
}

.risk {
  font-size: 0.65rem;
  padding: 2px 8px;
  border-radius: 2px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Cores de Risco Estilo "Alerta de Painel" */
.low {
  background: rgba(34, 197, 94, 0.1);
  color: #4ade80;
  border: 1px solid #4ade80;
}

.medium {
  background: rgba(234, 179, 8, 0.1);
  color: #facc15;
  border: 1px solid #facc15;
}

.high {
  background: rgba(239, 68, 68, 0.1);
  color: #f87171;
  border: 1px solid #f87171;
  box-shadow: 0 0 5px rgba(239, 68, 68, 0.3);
}

.event-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #666;
  font-family: 'Courier New', monospace;
}

.empty {
  color: #444;
  font-size: 0.85rem;
  text-align: center;
  padding: 2rem 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Customização da Scrollbar dos Logs */
ul::-webkit-scrollbar {
  width: 4px;
}
ul::-webkit-scrollbar-thumb {
  background: #333;
}
</style>    