<template>
    <section class="player">
        <!-- Área que simula o vídeo -->
        <div class="video-placeholder">
            <span>Stream simulado</span>
        </div>

        <div class="info">
            <p>
                <strong>Status:</strong>
                <span class="status">{{ status }}</span>
            </p>

            <p>
                <strong>Risco estimado:</strong>
                <span class="risk">{{ riscoEstimado }}</span>
            </p>

            <p>
                <strong>Confiança:</strong>
                <span class="confidence">
                    {{ confidence !== null ? confidence.toFixed(2) : '-' }}
                </span>
            </p>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { ref, onMounted, onUnmounted, computed } from 'vue';
    import { useSocket } from '~/service/socket';

    const status = ref('Aguardando');
    const confidence = ref<number | null>(null);
    const label = ref<string | null>(null);

    const socket = useSocket();
    const requestId = crypto.randomUUID();

    const riscoEstimado = computed(() => {
        if(label.value) return '-';

        if(label.value === 'violencia') return 'Alto';
        if(label.value === 'suspeito') return 'Médio';

        return 'Baixo';
    })

    onMounted(() => {
        socket.emit('start-inference', { requestId });

        socket.on('inference-result', (data) => {
            if(data.requestId !== requestId) return;

            status.value = data.status;
            confidence.value = data.inference.confidence;
            label.value = data.inference.label;
        });
    });

    onUnmounted(() => {
        socket.off('inference-result');
    })
</script>

<style scoped>
    .player{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    /* Área do "video" */
    .video-placeholder{
        background: #111;
        color: #fff;
        height: 220px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        font-size: 1rem;
    }

    /* Bloco de informações */
    .info{
        background: #f5f5f5;
        padding: 1rem;
        border-radius: 8px;
    }

    .info p{
        margin: 0.3rem;
        font-size: 0.95rem;
    }

    .status{
        color: #d97706;
    }

    .risk{
        color: #dc2626;
        font-weight: bold;
    }

    .confidence {
        font-family: monospace;
    }

    /* Responsivo */
    @media (min-width: 768px){
        .video-placeholder{
            height: 300px;
        }
    }
</style>