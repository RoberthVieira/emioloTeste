<template>
    <section class="events">
        <h2>Eventos recentes</h2>

        <ul v-if="eventos.length">
            <li v-for="evento in eventos" :key="evento.id" class="event-item">
                <div class="event-main">
                    <span class="label">{{ evento.label }}</span>
                    <span class="confidence">{{ evento.confidence }}</span>
                </div>

                <span class="timestamp">
                    {{ evento.timestamp }}
                </span>
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

    type Evento = {
        id: string
        label: string
        confidence: number
        timestamp: string
    }

    const eventos = ref<Evento[]>([]);

    const socket = useSocket();

    onMounted(() => {
        socket.on('inference-result', (data) => {
            const novoEvento: Evento = {
                id: crypto.randomUUID(),
                label: data.inference.label,
                confidence: data.inference.confidence,
                timestamp: new Date(data.timestamp).toLocaleTimeString()
            }

            //adiciona ao topo da lista
            eventos.value.unshift(novoEvento);

            //mantem os ultimos 10 eventos
            if(eventos.value.length > 10){
                eventos.value.pop();
            }
        })
    })

    onUnmounted(() => {
        socket.off('inference-result')
    })
</script>

<style scoped>
    .events{
        background-color: #f5f5ff;
        padding: 1rem;
        border-radius: 8px;
    }

    h2{
        font-size: 1.1rem;
        margin-bottom: 1rem;
    }

    ul{
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .event-item{
        background: #fff;
        padding: 0.75rem;
        border-radius: 6px;
        margin-bottom: 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
    }

    .event-main{
        display: flex;
        justify-content: space-between;
        font-size: 0.95rem;
    }

    .label {
        font-weight: 600;
    }

    .confidence{
        font-family: monospace;
    }

    .timestamp{
        font-size: 0.8rem;
        color: #666;
    }

    .empty{
        color: #666;
        font-size: 0.9rem;
    }
</style>