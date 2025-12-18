<template>
    <section class="player">
        <!-- Área que simula o vídeo -->
        <div class="video-placeholder">
            <span>Stream simulado</span>
        </div>

        <div class="info">
            <p>
                <strong>Status:</strong>
                <span class="status">Processando</span>
            </p>

            <p>
                <strong>Risco estimado:</strong>
                <span class="risk">Alto</span>
            </p>

            <p>
                <strong>Confiança:</strong>
                <span class="confidence">0.87</span>
            </p>
        </div>
    </section>
</template>

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