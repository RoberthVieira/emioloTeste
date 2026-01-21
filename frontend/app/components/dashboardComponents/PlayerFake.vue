<template>
  <section class="player">
    <!-- Video + overlay -->
    <div class="video-wrapper">
      <div class="video-placeholder">
        <span>Stream simulado</span>
      </div>

      <!-- Bounding box overlay -->
      <div
        v-if="bbox"
        class="bbox"
        :style="bboxStyle"
      >
        <span class="badge">
          {{ label }} • {{ riskLevel }}
        </span>
      </div>
    </div>

    <!-- Info panel -->
    <div class="info">
      <p>
        <strong>Conexão:</strong>
        <span :class="connectionStatus">{{ connectionStatus }}</span>
      </p>

      <p>
        <strong>Status:</strong>
        {{ status }}
      </p>

      <p>
        <strong>Confiança:</strong>
        {{ confidence !== null ? confidence.toFixed(2) : '-' }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted, onUnmounted } from 'vue';
    import { useSocket } from '~/service/socket';

    type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

    const socket = useSocket();
    const requestId = crypto.randomUUID();

    const status = ref('Aguardando');
    const confidence = ref<number | null>(null);
    const label = ref<string>('—');
    const riskLevel = ref<RiskLevel>('LOW');
    const connectionStatus = ref<'loading' | 'connected' | 'error'>('loading');

    const bbox = ref<[number, number, number, number] | null>(null);

    const bboxStyle = computed(() => {
        if (!bbox.value) return {};
        const [x, y, w, h] = bbox.value;

        return {
            left: `${x}%`,
            top: `${y}%`,
            width: `${w}%`,
            height: `${h}%`
        };
    });

    onMounted(() => {
        socket.on('connect', () => {
            connectionStatus.value = 'connected';
        });

        socket.on('disconnect', () => {
            connectionStatus.value = 'error';
        });

        socket.emit('start-inference', { requestId });

        socket.on('inference-result', (data) => {
            if (data.requestId !== requestId) return;

            status.value = data.status;
            confidence.value = data.inference.confidence;
            label.value = data.inference.label;
            riskLevel.value = data.riskLevel ?? 'LOW';

            bbox.value = data.inference.bbox ?? [20, 20, 30, 30];
        });
    });

    onUnmounted(() => {
        socket.off('inference-result');
        socket.off('connect');
        socket.off('disconnect');
    });
</script>

<style scoped>
.player {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    height: 100%;
}

.video-wrapper {
    position: relative;
    border: 2px solid #333;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

/* Linhas de scan estilo radar (efeito visual opcional) */
.video-wrapper::after {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), 
                linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
    background-size: 100% 4px, 3px 100%;
    pointer-events: none;
}

.video-placeholder {
    background: #050505;
    color: #444;
    height: 240px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Courier New', monospace;
    text-transform: uppercase;
    letter-spacing: 2px;
}

/* A Bounding Box da IA - Estilo "Target Locked" */
.bbox {
    position: absolute;
    border: 2px solid #00f2ff; /* Azul ciano estilo holograma */
    box-sizing: border-box;
    box-shadow: 0 0 8px #00f2ff, inset 0 0 8px #00f2ff;
    z-index: 10;
}

.badge {
    position: absolute;
    top: -25px;
    left: -2px;
    background: #00f2ff;
    color: #000;
    font-size: 0.7rem;
    font-weight: bold;
    padding: 2px 8px;
    border-radius: 2px;
    white-space: nowrap;
    text-transform: uppercase;
    font-family: 'Courier New', monospace;
}

.info {
    background: #111;
    padding: 1rem;
    border-radius: 4px;
    border: 1px solid #222;
}

.info p {
    margin: 0.5rem 0;
    font-size: 0.85rem;
    color: #aaa;
    font-family: 'Courier New', monospace;
    text-transform: uppercase;
}

/* Status com cores neon */
.connected {
    color: #4ade80 !important;
    text-shadow: 0 0 5px rgba(74, 222, 128, 0.5);
}

.loading {
    color: #fbbf24 !important;
}

.error {
    color: #f87171 !important;
    text-shadow: 0 0 5px rgba(248, 113, 113, 0.5);
}

/* Responsivo */
@media (min-width: 768px) {
    .video-placeholder {
        height: 320px;
    }
}
</style>