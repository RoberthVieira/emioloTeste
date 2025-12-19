<template>
  <section class="player">

    <div class="video-wrapper">
      <div class="video-placeholder">
        <span>Stream simulado</span>
      </div>

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
    gap: 1rem;
}

.video-wrapper {
    position: relative;
}

.video-placeholder {
    background: #111;
    color: #fff;
    height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
}

.bbox {
    position: absolute;
    border: 2px solid #dc2626;
    box-sizing: border-box;
}

.badge {
    position: absolute;
    top: -22px;
    left: 0;
    background: #dc2626;
    color: #fff;
    font-size: 0.75rem;
    padding: 2px 6px;
    border-radius: 4px;
    white-space: nowrap;
}

.info {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 8px;
}

.info p {
    margin: 0.3rem 0;
    font-size: 0.95rem;
}

.connected {
    color: #16a34a;
}

.loading {
    color: #d97706;
}

.error {
    color: #dc2626;
}

/* Responsivo */
@media (min-width: 768px) {
    .video-placeholder {
        height: 320px;
    }
}
</style>
